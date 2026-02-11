프로젝트 컨텍스트 (TailLog)
기준일: 2026-02-11 (KST, Auth UX Sprint 반영) 프로젝트명: TailLog 현재 단계: Phase 6 완료 + Auth UX 안정화 완료, Phase 7 고도화 준비
1) 한 줄 정의
TailLog는 반려견 행동을 ABC(선행-행동-결과) 기반으로 기록하고, 데이터 시각화와 AI 코칭으로 훈련 실행력을 높이는 행동 교정 SaaS다.
2) 대상 사용자
• 반려견 문제행동을 체계적으로 개선하려는 보호자
• 행동 이력을 기반으로 상담하려는 전문가/수의사
• 게스트 온보딩 후 정식 가입 전환이 필요한 신규 유저
3) 핵심 사용자 흐름
1. 랜딩/설문 진입 (게스트 또는 로그인 사용자)
2. 7단계 온보딩 설문 제출 (게스트: anonymous_sid 쿠키, 로그인: JWT)
3. 결과 페이지 즉시 분석(LLM 호출 없이 정적 매핑)
   - 게스트: 부분 결과 + blur/잠금 UI + 로그인 유도 CTA
   - 구독자: 전체 분석 리포트 + 7일 챌린지 시작
4. 로그인 전환 시 guest→user 데이터 자동 마이그레이션 (POST /auth/migrate-guest)
5. 대시보드/로그에서 지속 기록
6. AI 코칭/리포트 활용 및 구독 전환
※ Anonymous Auth 비활성 — signInAnonymously() 미사용, 쿠키 기반 게스트 식별
4) 핵심 기능
• 설문 기반 프로필/환경 수집 (dogs, dog_env)
• ABC 로그 기록/수정/조회 (behavior_logs)
• 대시보드 집계 + 시간대(Timezone) 기반 처리
• 분석 차트/히트맵/PDF 리포트
• 구독자/비구독자 데이터 가시성 분리(잠금 모드)
5) 현재 상태 (완료/진행/예정)
• 완료:
    ◦ 기반 구축(DB/보안/모델), 온보딩, 핵심 로그 루프
    ◦ 대시보드/로그 분석 시각화 및 PDF 리포트
    ◦ 챌린지/커리큘럼 매핑 및 UI 구조화
    ◦ 데이터 정합성/보안/성능 Sprint (guest→user 마이그레이션, 소유권 검증, timezone, 캐시)
    ◦ Auth UX/Redirect 안정화 (게스트 설문 허용, 결과 blur/잠금 UI, OAuth 오류 UI, 라우트 정규화)
• 진행:
    ◦ AI 코칭 고도화(RAG 연계 준비)
    ◦ 비용 최적화용 로그 요약 전략 구체화
• 예정:
    ◦ E2E 테스트 (게스트→로그인→마이그레이션 플로우)
    ◦ PWA 고도화
    ◦ 오프라인 동기화 정책 확정
    ◦ 대용량 알림 큐 아키텍처 도입
6) 아키텍처 요약
• Frontend: Next.js 16, TypeScript, TanStack Query, Tailwind CSS
• Backend: FastAPI, SQLAlchemy Async, Pydantic v2
• DB/Auth: Supabase PostgreSQL (RLS, Auth)
    ◦ Project ID: kvknerzsqgmmdmyxlorl
    ◦ Project URL: https://kvknerzsqgmmdmyxlorl.supabase.co
    ◦ Pooler: aws-0-ap-northeast-2.pooler.supabase.com:6543
    ◦ 환경변수: Frontend/.env.local, Backend/.env
• AI: OpenAI 기반 코칭 + 추후 RAG 고도화
• MCP: .claude/mcp.json — Supabase Management API 연결 (PAT 인증)
7) 핵심 데이터 모델
• users: 계정/권한/시간대/상태
• dogs: 반려견 기본 프로필
• dog_env: 환경/트리거/기질/과거 대처 메타데이터
• behavior_logs: ABC 행동 로그
• ai_coaching: 분석 리포트/액션 아이템
8) 비기능 원칙
• Timezone 정합성: 클라이언트 X-Timezone 기반으로 서버 처리 일관화
• 보안: RLS 전제 + 사용자 소유 데이터 접근 제한
• 성능: 대시보드/로그 캐시 일관성(TanStack Query key 규칙)
• 데이터 보호: 비구독자 잠금 화면에서 실제 솔루션 데이터 비렌더링
• 게스트 UX: 설문→결과(partial)까지 로그인 없이 접근 가능, 고의도 액션에서만 로그인 유도
• 라우트: /survey canonical (구 /Survey, /checkup 폐기)
9) Source of Truth
• docs/README.md
• docs/Structure.md
• docs/schema.md
• docs/ResultIntegrationPlan.md