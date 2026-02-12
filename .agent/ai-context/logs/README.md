# Session Logs (TailLog)

목적:
- 작업 중 상세 진행을 `logs/`에 누적한다.
- 작업 중에는 `logs/*.md`를 우선 갱신한다.
- 마일스톤 종료 시 `archive/YYYY-MM-DD/`에 `sprint-handoff-*.md`, `worklog.md`, `review-log.md`를 기록하고 `master-plan.md`에 반영한다.

파일 규칙:
- 파일명: `YYYY-MM-DD-session-log.md`
- append-only 권장

최소 기록 항목:
- 시간(KST)
- 작업 목표/범위
- 변경 파일
- 검증 명령/결과
- 커밋 ID(있으면)
- 다음 작업
