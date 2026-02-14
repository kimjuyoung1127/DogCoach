# Progress

Last Updated: 2026-02-14

## 2026-02-14
- 변경: UTF 인코딩 재발 방지 가드레일 추가.
- 이유: 일부 TS/TSX 파일에서 invalid UTF-8로 파싱 실패가 반복되어 저장/검증 단계에서 선제 차단 필요.
- 검증:
  - `Set-Location Frontend; node scripts/check-utf8.mjs`
  - 결과: `UTF-8 check passed.`
- 영향:
  - `.vscode/settings.json` 추가 (UTF-8 고정, auto guess 비활성, LF 고정)
  - `Frontend/scripts/check-utf8.mjs` 추가 (텍스트 파일 UTF-8 유효성 검사)
  - `Frontend/package.json`에 `check:utf8` 스크립트 추가
  - 개발자 로컬/CI에서 파싱 전 단계 차단 가능

- 변경: `ai-context`를 single-file bootstrap 운영 방식으로 재구조화.
- 이유: AI가 오래된 문맥을 덜 읽고, 당일 실행 가능한 문서만 읽도록 강제.
- 검증:
  - `Get-ChildItem .agent/ai-context`
  - `Get-ChildItem .agent/ai-context/archive/2026-02-14`
- 영향:
  - 협업 진입 순서 고정 (`00-index.md` 기준)
  - Active/Archive 경계 명확화

- 변경: Backend/Frontend 개발 환경 설정 및 서버 실행.
- 이유: 로컬 개발 환경 구축 및 동작 검증.
- 검증:
  - `Backend 서버: http://127.0.0.1:8000/docs`
  - `Frontend 서버: http://localhost:3000`
- 영향:
  - Backend Python 의존성 557개 패키지 설치 완료
  - Frontend npm 557개 패키지 설치 완료
  - 양쪽 서버 자동 리로드 활성화

- 변경: E2E 테스트 자동화 (게스트 → 로그인 → migrate-guest).
- 이유: 핵심 전환 플로우의 회귀 방지 및 멱등성 검증.
- 검증:
  - `python -m pytest tests/features/test_e2e_guest_migration.py -v`
  - 4 passed, 1 warning (AsyncMock 관련, 비치명적)
- 영향:
  - Backend API 레벨 E2E 테스트 4개 추가
  - Frontend 수동 체크리스트 문서화 (`docs/E2E-Test-Scenarios.md`)
  - Playwright 자동화 로드맵 정의

- 변경: Settings Page UX Improvements (준비중 팝업, 계정 삭제, PWA, 강아지 프로필 API, 사진 업로드).
- 이유: 사용자 경험 개선 및 미완성 기능 명확화.
- 완료: 16/16 작업 (100%)
  - Phase 1: ComingSoonModal, ConfirmDialog 생성, 불필요 텍스트 제거
  - Phase 2: SubscriptionSection 준비중 버튼 3개 연결
  - Phase 3: Backend dogs feature (GET /dogs/profile), useDogProfile 훅
  - Phase 4: Account deletion (DELETE /auth/me, useDeleteAccount)
  - Phase 5: Dog Profile 페이지 (/dog/profile)
  - Phase 6: PWA install (usePWAInstall, AppInfoSection 연동)
  - Phase 7: Dog Photo Upload & Display (Survey, Dashboard, Dog Profile)
- 검증:
  - `Backend: python -m compileall app/features/dogs app/features/auth` (성공)
  - Frontend 컴파일: 타입 에러 없음
  - Supabase Storage: 설정 문서 작성 완료
- 영향:
  - 설정 페이지 16개 기능 완료 (100%)
  - Backend: 2개 feature 추가 (dogs, auth 업데이트)
  - Frontend: 7개 컴포넌트 생성/수정, 4개 훅 추가, 1개 페이지 신규
  - 강아지 사진 업로드/표시 플로우 완성 (Survey → Storage → Dashboard/Profile)

- 변경: Logo Replacement (Sidebar, Header PNG 이미지로 교체).
- 이유: 브랜드 아이덴티티 강화, 텍스트 로고 대신 디자인된 이미지 사용.
- 검증:
  - `cd Frontend && npm run build` (13 pages 성공)
  - 시각적 확인: h-14 (56px), object-contain 비율 유지
- 영향:
  - Sidebar/Header 로고 PNG 파일로 교체 완료
  - Framer Motion 애니메이션 유지 (whileHover, whileTap)
  - 미사용 import 정리 (Settings, cn)

- 변경: Supabase Storage Bucket Setup (dog-profiles 버킷 생성 SQL).
- 이유: Survey 이미지 업로드 시 "Bucket not found", "RLS policy violation" 에러 해결.
- 검증:
  - SQL 스크립트 작성 완료 (create_dog_profiles_bucket.sql, fix_dog_profiles_rls.sql)
  - 기존 스키마 분석 완료 (supabase_schema.sql)
- 영향:
  - 게스트 사용자 업로드 허용 (Survey 접근성)
  - Public read, 모든 사용자 write 정책 설정
  - SQL 실행 대기 중 (사용자가 Supabase Dashboard에서 실행 필요)

## 2026-02-12 (요약)
- guest -> user 데이터 마이그레이션 엔드포인트 추가 (`POST /auth/migrate-guest`).
- dog 소유권 검증 강화, timezone 일관성 적용, 캐시 invalidation 정밀화.
- Supabase 스키마 복원(11 테이블, 7 트리거, RLS), Frontend/Backend 빌드 검증 통과.
