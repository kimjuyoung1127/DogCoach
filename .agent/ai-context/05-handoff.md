# Handoff

Last Updated: 2026-02-14

## Next Start Order
1. `.agent/ai-context/00-index.md`
2. `.agent/ai-context/01-today-plan.md`
3. `.agent/ai-context/03-open-issues.md`

## First 3 Tasks for Next Session
1. **STORAGE-SETUP-001** (긴급): Supabase Storage 버킷 생성 및 RLS 설정
   - `Backend/migrations/create_dog_profiles_bucket.sql` 실행
   - `Backend/migrations/fix_dog_profiles_rls.sql` 실행
   - Survey 사진 업로드 테스트
   - 참고: `.agent/ai-context/supabase-storage-setup.md`

2. `UI-NAV-001` + `DASH-LOG-002`: 플러스 버튼 경로 변경 및 대시보드 상세기록 모달 자동 오픈.

3. `COACH-I18N-003` + `COACH-UX-004`: 코칭 한글화와 보호자 레벨 제거.

## Verification Baseline
- `cd Frontend && npm run build`
- `cd Backend && python -m compileall app`

## Latest Completions (2026-02-14 Late Night)
- ✅ Logo Replacement: Sidebar/Header PNG 이미지로 교체 완료
- ✅ Supabase Storage SQL 스크립트 작성 (게스트 업로드 허용)
- ✅ Settings Page UX Improvements (16/16 tasks, 100%)
- ✅ Dog Profile API & Photo Upload/Display 완료

## Risks
- **긴급**: Supabase Storage 버킷 미생성 시 Survey 사진 업로드 불가 (SQL 실행 필요)
- OAuth 수동 설정 미완료 시 로그인 전환 플로우가 막힐 수 있음.
- 설정 API 미연동 상태가 길어지면 데모 신뢰도가 떨어질 수 있음.
- 해금 범위가 코드에 명시되지 않으면 공모전/정식모드 전환 시 회귀 위험이 큼.
