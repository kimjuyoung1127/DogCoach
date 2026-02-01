🏗️ Phase 1: 기반 인프라 (Security First)
[x] Supabase Enum 및 테이블 생성.

[x] [필수] RLS(Row Level Security) 정책 즉시 적용: users, dogs, behavior_logs 테이블에 대해 SELECT, INSERT, UPDATE 권한을 auth.uid() 기준으로 제한.

[x] (dog_id, occurred_at) 복합 인덱스 및 AI용 벡터 인덱스 설정.

🚪 Phase 2: 유저 유입 (Seamless Auth)
[x] 랜딩페이지 및 온보딩 설문 구현.

[x] Web-to-App UX 전환 구현:
    - Public: Footer 포함 (정보 탐색)
    - App: Bottom Navigation / Sidebar (도구 사용, Dynamic User/Dog Info 연동 완료)
    - Dashboard: PWA Style Header + Notification Badge (DB 연결 및 Auth 적용 완료)

[x] anonymous_sid 쿠키 및 게스트 데이터 저장 (Supabase Anonymous Auth).

[ ] [필수] 로그인 시 데이터 소유권 이전(Migration) 트리거 구현: 게스트 데이터 -> 정회원 데이터 병합 로직.

📝 Phase 3: 로그 수집 및 최적화 (Persistence & Cache)
[x] 퀵 기록(QuickLogGrid) 및 대시보드 UI 구현.

[x] 상세 ABC 기록 UI (Progressive Logging).

[x] [필수] 타임존 보정 로직: 프론트엔드에서 유저의 로컬 시간대(`X-Timezone`)를 감지하여 저장.

[x] Interaction Design & UI Polish: Skeleton 로딩, Entry 애니메이션, ScaleButton 피드백 적용.

[x] **Performance**: TanStack Query(React Query) 도입 및 쿼리 캐싱(Dashboard/Logs) 최적화로 페이지 간 이동 속도 극대화.

[x] **Log Analysis**: 행동 기록 분석 탭 고도화 및 실제 DB 데이터 연동(Timeline) 완료.
[x] **Data Visualization**: Recharts 기반 레이더 차트, 바 차트, 커스텀 히트맵 고도화.
[x] **Expert PDF Report**: `@react-pdf/renderer` 및 `html-to-image`를 활용한 전문가용 문진표 PDF 생성 기능.

🧠 Phase 4: AI 파이프라인 (Cost Control)
- [ ] 벡터 DB 구축.
- [ ] [필수] AI 비용 최적화(Summary) 로직: 로그가 50개 이상 쌓이면 '중간 요약'을 생성하여 별도 저장, RAG는 요약본을 우선 참조.
- [ ] 코칭 리포트 생성 및 피드백 루프.

📊 Phase 5: 습관 & 알림
- [ ] [필수] 대용량 알림 전송 큐(Queue) 설계: 수천 명에게 동시에 알림톡을 보낼 때 타임아웃이 나지 않도록 Supabase Edge Functions 또는 메시지 큐(Qstash 등) 도입.

⚡ Phase 6: 최적화 (Offline Sync)
[ ] PWA 설정 및 에셋 최적화.

[ ] [필수] 오프라인 충돌 해결 전략: 오프라인 상태에서 기록 후 온라인 전환 시, 서버 데이터와 충돌하면 '최신 기록(Last Write Wins)'을 우선순위로 두는 로직 정의.

🧪 Phase 7: 비즈니스 (Validation)
[ ] 결제 모듈 연동.

[ ] 전문가 대시보드.

[ ] 최종 보안 점검 (Double Check).