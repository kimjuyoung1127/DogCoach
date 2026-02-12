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
---

Day Close Checklist (2026-02-12, prepared by Codex)

1) Release safety
- [x] Frontend production build passed (`npm run build`)
- [x] Backend compile passed (`python -m compileall app`)
- [ ] Supabase SQL section for `training_behavior_snapshots` index migration applied

2) Phase 7 doc sync
- [x] `phase7-ai-recommendation-plan.md` updated with end-of-day implementation:
  - time-series snapshots
  - compare endpoint
  - API contract changes
  - validation results

3) Deploy/env checks (tomorrow first)
- [ ] Verify `NEXT_PUBLIC_API_URL` in Vercel
- [ ] Verify Render backend env and restart after SQL apply
- [ ] Smoke test:
  1. login -> log page
  2. start training (snapshot created)
  3. create second snapshot later / with test data
  4. compare endpoint returns trend

4) Known risks to verify next session
- [ ] Existing clients calling `GET /coach/behavior-snapshot/{curriculum_id}` must now include `dog_id` query
- [ ] Compare endpoint requires at least 2 snapshots for same `(user, dog, curriculum)`

---

Day Close Checklist (2026-02-13, prepared by Claude Code)

1) 오늘 완료 요약
- 대시보드 버그 수정: 새 로그 등록 시 목록에서 사라지는 문제 해결 (낙관적 업데이트 + AnimatePresence 패턴 변경 + temp-id→real-id 교체)
- 백엔드 안정화: HTTPException 수정, chronic_issues 타입 가드, 타임존 검증, DEBUG print 보안 이슈 제거, Streak 연속일수 로직 개선
- UI 개선: Toast를 createPortal로 stacking context 탈출, EditLogDialog compact layout (스크롤 없이 한 화면)
- 코드 정리: 중복 invalidation 제거, 미사용 파일 삭제 (QuickLogGrid, DailyBriefing)

2) 빌드/품질 확인
- [ ] Frontend: cd Frontend && npm run build
- [ ] Backend: cd Backend && python -m compileall app
- [ ] 핵심 플로우: 빠른 기록 → 토스트 표시 → 목록 즉시 반영 → EditLogDialog 스크롤 없이 전체 보임
- [ ] QuickLogWidget 디버그 console.log 제거 여부 결정

3) 내일 우선순위 (UI 안정화 + 배포)
- P1: 전체 UI 안정화 점검 (모바일/데스크톱 반응형, 애니메이션 일관성)
- P2: Vercel + Render 배포 (NEXT_PUBLIC_API_URL, 환경변수 확인)
- P3: 배포 후 Smoke test (설문 → 결과 → 대시보드 → 빠른 기록 → 코칭)

4) 배포 전 필수 확인
- [ ] Vercel에 NEXT_PUBLIC_API_URL 설정
- [ ] Render backend 환경변수 (SECRET_KEY, DB URL, OPENAI_API_KEY)
- [ ] Supabase Google OAuth 설정
- [ ] Supabase SQL migration (training_behavior_snapshots 인덱스)

5) 문서 동기화
- [x] review-log.md에 오늘 변경사항 기록 완료
- [x] phase7-ai-recommendation-plan.md → archive/2026-02-12/ 이동 완료
