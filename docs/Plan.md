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
[x] 설문 고도화: Step 2 주 양육자 다중 선택 및 프리미엄 커스텀 입력 모달 구현.

[x] [필수] 로그인 시 데이터 소유권 이전(Migration) 및 스마트 리디렉션 구현:
    - `/auth/callback`을 통한 Dog 존재 여부 확인 및 자동 라우팅.
    - 정회원 전환 시 게스트 데이터 연결 기반 마련.

📝 Phase 3: 로그 수집 및 최적화 (Persistence & Cache)
[x] 퀵 기록(QuickLogGrid) 및 대시보드 UI 구현.

[x] 상세 ABC 기록 UI (Progressive Logging).

[x] [필수] 타임존 보정 및 시간 편집 로직:
    - 상세 기록 시 `occurred_at` 직접 수정 기능 (백데이팅 지원).
    - 프론트엔드에서 유저의 로컬 시간대(`X-Timezone`)를 감지하여 저장.

[x] Interaction Design & UI Polish:
    - **Lottie Loading**: `Jackie.json` 및 `Cute Doggie.json`을 활용한 풍부한 로딩 애니메이션 적용.
    - Skeleton 로딩 고도화, Entry 애니메이션, ScaleButton 피드백 적용.

[x] **Localization**: 영문 DB ID(separation, touch 등)를 사용자 친화적인 한글로 마스킹하는 매핑 시스템 구축.

[x] **Performance**: TanStack Query(React Query) 도입 및 쿼리 캐싱(Dashboard/Logs) 최적화로 페이지 간 이동 속도 극대화.

[x] **Log Analysis**: 행동 기록 분석 탭 고도화 및 실제 DB 데이터 연동(Timeline) 완료.
[x] **Data Visualization**: Recharts 기반 레이더 차트, 바 차트, 커스텀 히트맵 고도화.
[x] **Expert PDF Report**: `@react-pdf/renderer` 및 `html-to-image`를 활용한 전문가용 문진표 PDF 생성 기능.
[x] **Local AI Integration**: Cloudflare Tunnel을 통한 로컬 Ollama(Qwen2.5) 연동 및 리포트 내 AI 심층 분석/편지 기능 탑재.

### ✅ Phase 4: 지능 (Coach & Curriculum)
- [x] **AI 코칭 API**: 기본적인 슬롯 필링 기반 코칭 로직 (`coach/service.py`) 구현 완료.
- [x] **LLM 심층 분석**: 최근 로그 및 환경 데이터를 기반으로 한 AI 전문가 진단 및 '강아지의 속마음 편지' 생성 기능 (Phase 1 완료).
- [x] **맞춤형 커리큘럼**: 사용자 이슈에 따른 7일 챌린지 자동 생성 및 데이터 매핑 (`curriculum.ts`, `CoachPage`).
- [x] **UX 최적화**: 결과 분석 -> AI 리포트 생성 -> 훈련 추천으로 이어지는 유기적인 전환 flow 구축.
- [ ] **RAG 고도화**: 벡터 DB(Supabase Vector) 연동 및 실제 로그 데이터 컨텍스트 주입 예정.
- [x] **AI 비용 최적화**: 로컬 LLM(Qwen2.5) 도입으로 API 비용 $0 달성.

📊 Phase 5: 습관 & 알림
- [ ] [필수] 대용량 알림 전송 큐(Queue) 설계: 수천 명에게 동시에 알림톡을 보낼 때 타임아웃이 나지 않도록 Supabase Edge Functions 또는 메시지 큐(Qstash 등) 도입.

🧪 Phase 6: 최적화 (Offline Sync)
[x] PWA 설정 (`manifest.json`) 및 에셋 최적화 기초 완료.

[ ] [필수] 오프라인 충돌 해결 전략: 오프라인 상태에서 기록 후 온라인 전환 시, 서버 데이터와 충돌하면 '최신 기록(Last Write Wins)'을 우선순위로 두는 로직 정의.

🧪 Phase 7: 비즈니스 (Validation)
[ ] 결제 모듈 연동.

[ ] 전문가 대시보드.

[ ] 최종 보안 점검 (Double Check).

### 💎 Phase 8: Premium Experience (Branding & Identity)
- [x] **Branding Refresh**: 국문 가독성을 극대화한 **나눔스퀘어라운드(NanumSquareRound)** 폰트 도입 및 적용.
- [x] **Alive Aesthetic**: 유기적 배경 블롭(Organic Blobs), 고도화된 글래스모피즘 컨테이너, 스테이지별 시네마틱 애니메이션 적용.
- [x] **UX Geometry**: 설문 조사 컨테이너 720px 고정 및 내부 스크롤 최적화를 통해 일관된 시각 프레임 확보.
- [x] **Dev Productivity**: Home/Survey/Result/Dash를 자유롭게 이동할 수 있는 **글로벌 디버그 네비게이션** 구축.