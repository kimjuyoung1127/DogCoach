# Handoff

Last Updated: 2026-02-14

## Next Start Order
1. `.agent/ai-context/00-index.md`
2. `.agent/ai-context/01-today-plan.md`
3. `.agent/ai-context/03-open-issues.md`

## First 3 Tasks for Next Session
1. `UI-NAV-001` + `DASH-LOG-002`: 플러스 버튼 경로 변경 및 대시보드 상세기록 모달 자동 오픈.
2. `COACH-I18N-003` + `COACH-UX-004`: 코칭 한글화와 보호자 레벨 제거.
3. `SETTINGS-API-005` + `SUB-UNLOCK-006` + `SETTINGS-KAKAO-007`: 설정 실동작/API 연동 + 공모전 해금 + 카카오 준비중 정책 반영.

## Verification Baseline
- `cd Frontend && npm run build`
- `cd Backend && python -m compileall app`

## Risks
- OAuth 수동 설정 미완료 시 로그인 전환 플로우가 막힐 수 있음.
- 설정 API 미연동 상태가 길어지면 데모 신뢰도가 떨어질 수 있음.
- 해금 범위가 코드에 명시되지 않으면 공모전/정식모드 전환 시 회귀 위험이 큼.
