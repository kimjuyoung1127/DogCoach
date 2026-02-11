Codex Review Guideline (TailLog)
기준 폴더: .agent/ai-context
1) 시작 순서
1. master-plan.md
2. project-context.md
3. worklog.md
4. review-log.md
5. 기준 문서: docs/README.md, docs/schema.md, docs/ResultIntegrationPlan.md
2) 리뷰 우선순위
1. 동작 오류/회귀
2. 데이터 정합성
3. 보안/권한
4. 성능 회귀
5. 테스트 누락
3) 핵심 체크리스트 (확장판)

A. 데이터 캐싱 최적화 (Frontend: TanStack Query 중심)
• Query Key 일관성:
    ◦ query-keys factory를 사용하고 문자열 하드코딩 키가 섞이지 않는가
    ◦ dogId/userId/page/filter 파라미터가 key에 정확히 반영되는가
• Invalidation 정확도:
    ◦ mutation 후 전체 무효화 대신 대상 key만 정밀 invalidation 하는가
    ◦ dashboard/log/result 간 연쇄 갱신 누락이 없는가
• Stale/Refetch 정책:
    ◦ staleTime, gcTime, refetchOnWindowFocus 설정이 화면 특성에 맞는가
    ◦ 로딩 중 깜빡임(loading flicker)이나 과도한 재요청이 없는가
• 낙관적 업데이트 안정성:
    ◦ onMutate/onError rollback이 실제 데이터 구조와 일치하는가
    ◦ 실패 시 캐시 오염/중복 항목이 남지 않는가
• 중복 호출 방지:
    ◦ 같은 화면에서 동일 API가 중복 호출되지 않는가
    ◦ callback/useEffect에서 레이스로 중복 fetch가 발생하지 않는가

B. 백엔드 연계/API 계약 안정성
• API 계약 일치:
    ◦ Frontend payload/response 타입이 backend schema와 정확히 맞는가
    ◦ optional/nullable 필드 처리 불일치로 런타임 에러가 발생하지 않는가
• 에러 처리:
    ◦ 401/403/404/422/500을 UI에서 구분 처리하는가
    ◦ callback/login/survey 핵심 플로우에서 무음 실패 redirect가 없는가
• 인증/세션 흐름:
    ◦ guest와 authenticated 흐름이 분기 충돌 없이 동작하는가
    ◦ migrate-guest는 멱등하며 재호출 시 안전한가
• Timezone 전달:
    ◦ X-Timezone 헤더가 필요한 API에 누락 없이 포함되는가
    ◦ 서버 집계 기준과 클라이언트 표시 기준이 일치하는가

C. 데이터베이스 연계/정합성 (Supabase + RLS)
• RLS/소유권:
    ◦ 모든 read/write가 auth.uid 또는 guest sid 소유권 검증을 통과하는가
    ◦ 타인 dog_id로 로그/코칭/대시보드 접근이 차단되는가
• 마이그레이션/멱등성:
    ◦ guest -> user 이전 시 중복 이전/유실이 없는가
    ◦ unique/index/where 조건으로 멱등성이 보장되는가
• 인덱스/쿼리 효율:
    ◦ dog_id, occurred_at, anonymous_sid 등 주요 필드 인덱스가 존재하는가
    ◦ 최근 변경 쿼리가 풀스캔을 유발하지 않는가
• 데이터 보호:
    ◦ Locked Mode에서 실제 솔루션 데이터가 API/DOM에 노출되지 않는가
    ◦ 비구독자 응답은 teaser/skeleton 수준으로 제한되는가

D. 모바일 반응성/사용성
• 레이아웃 안정성:
    ◦ 320/360/390/430px에서 가로 스크롤이 발생하지 않는가
    ◦ fixed/sticky/footer/nav가 safe-area와 충돌하지 않는가
• 상호작용:
    ◦ 터치 타겟(버튼/탭/입력)이 충분한 크기와 간격을 가지는가
    ◦ 키보드 오픈 시 입력 폼과 CTA가 가려지지 않는가
• 성능/체감 UX:
    ◦ 첫 로딩 시 CLS(레이아웃 점프)와 과도한 애니메이션이 없는가
    ◦ 저사양 모바일에서 스크롤/전환 프레임 드랍이 없는가
• 인증/온보딩 플로우:
    ◦ survey -> result -> login/callback 전환이 모바일 브라우저에서 끊기지 않는가
    ◦ 외부 OAuth 복귀 후 올바른 화면으로 복귀하는가

E. 회귀 방지 공통
• 리포트/차트:
    ◦ PDF/차트 렌더 실패 또는 데이터 mismatch가 없는가
• 로그/관측성:
    ◦ 디버그 로그가 운영 환경에 과다 노출되지 않는가
    ◦ 장애 재현에 필요한 최소 로그는 남는가
• 테스트:
    ◦ 최소 happy path + 실패 path(인증 실패, 네트워크 실패, 빈 데이터)가 검증되는가
4) 리뷰 기록 형식
• [심각도] 파일:라인 - 문제 - 영향 - 수정 제안 - 검증 방법
• 심각도 순서: 치명적 -> 높음 -> 보통 -> 낮음

5) 심각도 기준 (판단 통일)
• 치명적:
    ◦ 데이터 유출, 타인 데이터 접근, 결제/인증 우회, 주요 플로우 완전 차단
• 높음:
    ◦ 핵심 기능 오동작(설문 제출 실패, 로그인 루프, 잘못된 마이그레이션)
• 보통:
    ◦ 성능 저하, 모바일 사용성 문제, 엣지케이스 오류
• 낮음:
    ◦ 문구/경고/미세 UI/리팩토링 권장 사항

6) 빠른 점검 명령 (권장)
• 경로/참조 점검: rg -n "/Survey|/checkup|TODO|FIXME" Frontend/src docs -S
• 캐시 관련 점검: rg -n "invalidateQueries|queryKey|useQuery|useMutation" Frontend/src -S
• 인증 플로우 점검: rg -n "auth/callback|getSession|signInWithOAuth|migrate-guest" Frontend/src Backend/app -S
• 빌드 점검: cd Frontend && npm run build
• 백엔드 정적 점검: cd Backend && python -m compileall app
7) 판단 기준
• 머지 가능: 치명적/높음 없음
• 조건부 가능: 보통 이슈 후속 계획 명시
• 머지 불가: 사용자 흐름 차단 또는 데이터 유출 위험 존재
8) 기록 규칙
• 리뷰 완료 즉시 review-log.md 반영
• 재발 이슈는 "재발" 태그와 원인 기록
