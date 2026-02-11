Sprint Handoff (2026-02-11, TailLog)
1) 목표
• TailLog 핵심 루프(설문 -> 결과 -> 대시보드 -> 로그)의 데이터 정합성/보안/성능 안정화
• Phase 7 고도화(PWA, 오프라인 동기화, RAG 성능 향상) 진입 전 필수 리스크 해소
2) 범위 (In / Out)
In
• guest -> user 데이터 이전 로직 확정 및 검증
• Result 페이지 보안 잠금 모드(데이터 비렌더링) 재검증
• timezone(X-Timezone) 처리 일관성 검증
• 대시보드/로그 캐시 정합성 점검
Out
• 결제 모듈 본개발
• 전문가 전용 운영 대시보드 본개발
• 대규모 알림 큐 인프라 최종 도입
3) 파일별 지시
Backend/app/features/onboarding/*
• 설문 저장 후 guest 식별자(anonymous_sid) 흐름을 점검
• 로그인 전환 시 데이터 이전 누락/중복 여부 검증
Backend/app/features/log/*
• 로그 생성/수정/조회 시 사용자 소유권 체크 일관화
• timezone 헤더 반영 및 UTC 저장 표준 재확인
Frontend/src/components/features/result/*
• 비구독자 잠금 모드에서 실제 솔루션 데이터가 DOM에 생성되지 않도록 유지
Frontend/src/hooks/useQueries.ts
• 대시보드/로그 관련 query key 및 invalidation 규칙 점검
Frontend/src/lib/query-keys.ts
• 키 충돌 방지 규칙 유지 및 신규 키 네이밍 일관성 검토
4) 수용 기준 (Acceptance Criteria)
1. ✅ guest -> user 전환 후 기존 설문/로그 데이터가 1회만 정확히 이전된다.
    ◦ 구현: POST /auth/migrate-guest + useAuth.ts 자동 호출
    ◦ 멱등성: WHERE user_id IS NULL 조건으로 중복 이전 방지
2. ✅ 비구독자 상태에서 상세 솔루션 텍스트가 DOM/응답 데이터에 노출되지 않는다.
    ◦ 구현: debugForcePro 완전 제거, LockedAnalysisSection skeleton만 렌더링 확인
3. ✅ timezone 적용 집계가 동일 조건에서 일관된 결과를 반환한다.
    ◦ 구현: X-Timezone 헤더 → get_today_with_timezone() + ZoneInfo 변환
4. ✅ 대시보드/로그 갱신 시 stale 데이터가 남지 않는다.
    ◦ 구현: QUERY_KEYS.logs(dogId) 정밀 invalidation + survey 후 dashboard 갱신
5) 리스크
• 데이터 이전 로직 부재 시 게스트 데이터 유실 가능 ✅ 해결됨
• 잠금 UI에서 prop 누수 시 데이터 유출 가능 ✅ 해결됨
• timezone 기준 불일치 시 분석 신뢰도 하락 ✅ 해결됨
• [잔여] Backend/.env credential 플레이스홀더 → 배포 전 교체 필요
• [잔여] Google OAuth 미설정 → Supabase Dashboard에서 수동 설정 필요
6) 검증 명령
• Frontend: cd Frontend && npm run build → ✅ 성공 (12/12 pages)
• Backend: cd Backend && python -m compileall app → ✅ 성공
• Supabase: 11 테이블 + 7 트리거 + RLS + 인덱스 → ✅ 생성 완료
7) Sprint 완료 상태 (2026-02-12)
• 전체 상태: 코드 구현 완료, 빌드 검증 완료
• 변경 규모: Backend 9파일 + Frontend 6파일 = 15파일
• 인프라: Supabase DB 스키마 전체 복원 완료
• 잔여 수동 작업: .env credential 교체, Google OAuth 설정
• 다음 단계: E2E 테스트 → 커밋 → Phase 7 고도화 진입

---

Auth UX/Redirect Handoff (2026-02-11 추가 → 2026-02-11 구현 완료)
1) 이슈 요약
• 이전 흐름: Survey -> /login 강제 이동 -> Result (UX 단절)
• 문제 A: ✅ 해결 — 설문 완료 직후 로그인 화면 강제 노출
• 문제 B: ✅ 해결 — 로그인 상태에서도 다음 단계 진행 실패
• 문제 C: ✅ 해결 — 게스트가 결과 페이지에서 에러만 표시

2) 구현 완료 내역
a) 게스트 설문 제출 허용
• SurveyContainer.tsx: token 없을 때 /login 이동 분기 완전 제거
• useQueries.ts: useSubmitSurvey에서 token 필수 예외 제거, credentials: 'include'로 게스트 submit 허용
• api.ts: buildUrl() 이중 /api/v1 접두사 버그 수정 (.env에 이미 /api/v1 포함 시 중복 방지)

b) Result 페이지 게스트 대응
• result/page.tsx: dashboardData 없을 때 에러 화면 대신 fallback 기본값 사용
  - dog_profile = { name: "반려견", profile_image_url: null }
  - issues = [] (빈 배열 → 기본 커리큘럼 매핑)
• 게스트는 LockedAnalysisSection(blur/skeleton) + ConversionCTA(로그인 유도) 표시
• 미사용 import 정리: TRAINING_CURRICULUM 제거, error 변수 제거

c) useAuth.ts 게스트 처리
• signInAnonymously() 호출 완전 제거 (새 Supabase 프로젝트에서 Anonymous Auth 비활성)
• 세션 없으면 loading=false로 설정, 게스트로 계속 진행
• auth-provider.tsx 타입 오류 수정: (_event: string, session: Session | null)

d) OAuth callback 재작성
• 3-state 관리: processing → error → success-routing
• 실패 시: 오류 메시지 + "다시 시도하기" 버튼 + "로그인 페이지로 이동" 버튼
• 성공 시: /auth/me 조회 → latest_dog_id 유무에 따라 /dashboard 또는 /survey 이동

e) 로그인 페이지 세션 인식
• login/page.tsx: 마운트 시 getSession() 호출
• 비익명 세션 존재 시 /auth/me 조회 후 자동 redirect (/dashboard 또는 /survey)

f) 라우트 표준화 (/Survey → /survey)
• git mv로 디렉토리 이름 변경 (대소문자 불가 파일시스템 대응: 2단계 mv)
• 변경 파일: Header.tsx, HeroSection.tsx, PricingSection.tsx, FinalCTASection.tsx, layout.tsx, dashboard/page.tsx
• docs 변경: SurveyPlan.md(/checkup→/survey), wireframe.md, deploy.md

3) 수정된 파일 목록 (총 16파일)
Frontend (14파일)
├─ src/components/features/survey/SurveyContainer.tsx  [수정] /login redirect 제거
├─ src/hooks/useQueries.ts                             [수정] guest submit 허용
├─ src/hooks/useAuth.ts                                [수정] signInAnonymously 제거, 게스트 처리
├─ src/lib/api.ts                                      [수정] buildUrl() 이중 prefix 수정
├─ src/lib/auth-provider.tsx                           [수정] 타입 에러 수정
├─ src/app/auth/callback/page.tsx                      [수정] 3-state 오류 UI
├─ src/app/login/page.tsx                              [수정] 세션 선확인 + 자동 redirect
├─ src/app/(public)/result/page.tsx                    [수정] 게스트 fallback + 미사용 import 정리
├─ src/app/(public)/survey/page.tsx                    [이름변경] Survey → survey
├─ src/app/(public)/layout.tsx                         [수정] /Survey → /survey
├─ src/components/shared/layout/Header.tsx             [수정] /Survey → /survey (3곳)
├─ src/components/features/landing/HeroSection.tsx     [수정] /Survey → /survey
├─ src/components/features/landing/PricingSection.tsx  [수정] /Survey → /survey (2곳)
└─ src/components/features/landing/FinalCTASection.tsx [수정] /Survey → /survey
Docs (2파일)
├─ docs/SurveyPlan.md                                  [수정] /checkup → /survey
└─ docs/wireframe.md                                   [수정] /Survey → /survey

4) 검증 결과
• npm run build: ✅ 성공 (12/12 pages, 0 TypeScript 에러)
• 게스트 플로우 코드 리뷰: ✅ SurveyContainer → useSubmitSurvey → Backend(anonymous_sid 쿠키) → result/page.tsx(fallback) 연결 확인
• /Survey, /checkup 잔존 참조: ✅ 코드/문서 내 0건

5) 잔여 리스크
• [보통] Supabase Google OAuth Redirect URL 미설정 → callback 실패 지속 가능
• [보통] Backend/.env credential 플레이스홀더 → 배포 전 실값 교체 필요
• [낮음] auth-provider.tsx 미커밋 상태 (untracked file)
• [낮음] 게스트 결과 페이지에서 dashboardData가 null일 때 mapIssueToCurriculum([])의 기본 커리큘럼 내용 적절성 확인 필요

6) Codex 리뷰 요청 포인트
• SurveyContainer.tsx: /login redirect 제거 후 게스트 submit 흐름 안전성
• result/page.tsx: 게스트 fallback 시 LockedAnalysisSection에 실제 솔루션 데이터 비노출 확인
• api.ts buildUrl(): /api/v1 이중 접두사 방지 로직의 엣지케이스 검토
• auth/callback/page.tsx: 3-state 전환 시 race condition 가능성 검토
• useAuth.ts: signInAnonymously 제거 후 기존 anonymous 세션 사용자 영향 확인
