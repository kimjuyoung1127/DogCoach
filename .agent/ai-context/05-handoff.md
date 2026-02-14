# Handoff

Last Updated: 2026-02-15

## Next Start Order
1. `.agent/ai-context/00-index.md`
2. `.agent/ai-context/01-today-plan.md`
3. `.agent/ai-context/03-open-issues.md`

## First 3 Tasks for Next Session
1. **FLY-OPS-001 (긴급)**: GitHub Actions 자동배포 활성화 마무리
   - GitHub repo secret 등록: `FLY_API_TOKEN`
   - Actions 실행 확인: `.github/workflows/fly-backend-deploy.yml`
   - `Backend/**` 변경 후 `main` push 시 Fly 자동배포 되는지 검증

1. **STORAGE-SETUP-001** (긴급): Supabase Storage 버킷 생성 및 RLS 설정
   - `Backend/migrations/create_dog_profiles_bucket.sql` 실행
   - `Backend/migrations/fix_dog_profiles_rls.sql` 실행
   - Survey 사진 업로드 테스트
   - 참고: `.agent/ai-context/supabase-storage-setup.md`

2. **FLY-CUTOVER-002**: 프론트 운영 환경변수 API 전환
   - 프론트 호스팅 환경변수: `NEXT_PUBLIC_API_URL=https://api.mungai.co.kr`
   - 운영 검증: 로그인/설문/결과/대시보드/업로드 + CORS
   - 롤백: 기존 Render API URL로 즉시 복귀 가능하도록 기록 유지

3. `UI-NAV-001` + `DASH-LOG-002`: 플러스 버튼 경로 변경 및 대시보드 상세기록 모달 자동 오픈.

4. `COACH-I18N-003` + `COACH-UX-004`: 코칭 한글화와 보호자 레벨 제거.

## Verification Baseline
- `cd Frontend && npm run build`
- `cd Backend && python -m compileall app`

## Latest Completions (2026-02-15)
- ✅ Result 페이지 UX 개선: BehaviorIssueSummary 추가 (실제 Survey 데이터 표시), CoreDataRequiredBanner 제거 (데이터 유실 방지), BarkingHeatmap 삭제 (의미 없는 목업 데이터)
- ✅ API 204 No Content 처리: DELETE 요청 빈 응답 처리 로직 추가, Settings 계정 삭제 버그 수정
- ✅ Google OAuth 법적 문서 페이지: /privacy, /terms 추가 (OAuth 동의 화면 필수 링크)
- ✅ Dashboard EnhancementCard 제거: 데이터 유실 방지 (survey?enhance=true 리다이렉트 문제), hasOptionalData() 미사용 함수 제거
- ✅ Vercel 배포 안정화: ConversionCTA prop 추가, 환경변수 HTTPS 설정, Mixed Content 방지 (api.ts HTTPS 강제 변환)

## Previous Completions (2026-02-14 Late Night)
- ✅ Logo Replacement: Sidebar/Header PNG 이미지로 교체 완료
- ✅ Supabase Storage SQL 스크립트 작성 (게스트 업로드 허용)
- ✅ Settings Page UX Improvements (16/16 tasks, 100%)
- ✅ Dog Profile API & Photo Upload/Display 완료
- ✅ Fly.io Phase 1(Backend Only): `dogcoach-api` 배포 + `api.mungai.co.kr` 인증서 Issued 확인
- ✅ GitHub Actions(backend auto deploy) 워크플로우 추가

## Risks
- **긴급**: Supabase Storage 버킷 미생성 시 Survey 사진 업로드 불가 (SQL 실행 필요)
- `FLY_API_TOKEN` 미설정 시 GitHub Actions 배포 실패
- OAuth 수동 설정 미완료 시 로그인 전환 플로우가 막힐 수 있음.
- 설정 API 미연동 상태가 길어지면 데모 신뢰도가 떨어질 수 있음.
- 해금 범위가 코드에 명시되지 않으면 공모전/정식모드 전환 시 회귀 위험이 큼.
