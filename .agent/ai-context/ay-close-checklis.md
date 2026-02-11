ay-close-checklist.md


하루 마감 체크리스트 (TailLog)
기준 시간: KST 사용 위치: .agent/ai-context
1) 당일 결과 정리
• [x] 오늘 완료/미완료 3줄 요약
• [x] 내일 우선순위 1~3 확정
• [x] master-plan.md 진행 상태 갱신 여부 점검
2) 로그/핸드오프 정리
• [x] logs/YYYY-MM-DD-session-log.md append
• [x] sprint-handoff-2026-02-11.md 최신 상태 반영
• [x] 마일스톤 종료가 아니면 worklog.md/review-log.md는 스킵 가능
3) 품질 확인
• [x] Frontend: cd Frontend && npm run build
• [ ] Backend: cd Backend && python -m pytest tests (불가 시 사유 기록)
• [x] 핵심 플로우 수동 확인(설문 -> 결과 -> 대시보드 -> 로그)
• [x] Encoding check: UTF-8 + LF verified for changed files.
4) 문서 동기화 확인
• [x] 변경 내용이 docs/ 기준과 충돌 없는지 확인
• [x] 구식 프로젝트 용어가 문서에 남아있지 않은지 확인
• [x] 인코딩 규칙 문서(encoding-guideline.md)와 불일치 없는지 확인
5) 내일 시작 전 확인
• [x] 최신 session log에서 다음 작업 1~2개 확정
• [x] 필요 환경변수/실행 경로 정리