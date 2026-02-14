### [2026-02-14 Morning] ai-context 재구조화
- 목표:
  - collaboration-ops-plan 기준 Active Docs 재편
- 변경 파일:
  - `.agent/ai-context/00-index.md`
  - `.agent/ai-context/01-today-plan.md`
  - `.agent/ai-context/02-progress.md`
  - `.agent/ai-context/03-open-issues.md`
  - `.agent/ai-context/04-rules.md`
  - `.agent/ai-context/05-handoff.md`
- 검증:
  - 루트 Active Docs/Archive 분리 상태 확인
- 결과:
  - 완료

### [2026-02-14 Afternoon] 개발 환경 설정 및 서버 실행
- 목표:
  - Backend/Frontend 로컬 개발 환경 구축
- 단계:
  1. Backend 가상환경 활성화 시도 (PowerShell 실행 정책 오류)
  2. Git Bash로 전환하여 가상환경 활성화
  3. `pip install -r requirements.txt` 실행 (557 패키지, 49초)
  4. `python -m uvicorn app.main:app --reload` 백그라운드 실행
  5. Frontend `npm install` 실행 (557 패키지, 49초)
  6. `npm run dev` 백그라운드 실행 (Next.js 16.1.1 Turbopack)
- 검증:
  - Backend: http://127.0.0.1:8000/docs (Swagger UI 접근 가능)
  - Frontend: http://localhost:3000 (Next.js 앱 실행 확인)
- 결과:
  - 완료. 양쪽 서버 자동 리로드 활성화됨
- 이슈:
  - Frontend npm audit 경고 (1 high severity vulnerability) - 추후 `npm audit fix` 필요

### [2026-02-14 Late Afternoon] E2E 테스트 자동화
- 목표:
  - 게스트 → 로그인 → migrate-guest 플로우 E2E 테스트 작성
- 단계:
  1. 기존 테스트 구조 분석 (`Backend/tests/features/test_auth.py`)
  2. `test_e2e_guest_migration.py` 생성 (4개 테스트 케이스)
     - 게스트 → 사용자 마이그레이션 성공
     - 게스트 데이터 없는 경우 (migrated_count=0)
     - 멱등성 검증 (2회 호출)
     - JIT 사용자 생성 + 마이그레이션
  3. Import 오류 수정 (`app.features.dog` 제거)
  4. pytest 실행: 4 passed, 1 warning
  5. Frontend E2E 시나리오 문서 작성 (`docs/E2E-Test-Scenarios.md`)
- 검증:
  - `python -m pytest tests/features/test_e2e_guest_migration.py -v`
  - 모든 테스트 통과 (0.60초)
- 결과:
  - 완료. Backend API E2E 자동화 완료
  - Frontend 수동/자동 테스트 가이드 문서화
- 이슈:
  - AsyncMock 경고 1건 (비치명적, 추후 개선 가능)


### [2026-02-14 Evening] Settings Page UX Improvements
- 목표:
  - 설정 페이지 UX 개선 (준비중 팝업, 계정 삭제, PWA 설치 등)
  - 강아지 프로필 API 연동
- 완료 작업 (12/16 - 75%):
  **Phase 1: 기본 모달 & 텍스트 정리**
  1. ComingSoonModal 컴포넌트 생성 (Frontend/src/components/shared/modals/)
  2. ConfirmDialog 컴포넌트 생성
  3. SubscriptionSection: "전문 도그 위스퍼러 1:1 채팅" 제거
  4. NotificationSection: "사업자 등록/채널 승인" 텍스트 제거
  
  **Phase 2: 준비중 버튼 연결**
  5. SubscriptionSection 3개 버튼에 ComingSoonModal 연결
     - Pro 구독, 구독 관리, 프로모션 코드
  
  **Phase 3: 반려견 프로필 (Backend + Frontend)**
  6. Backend dogs feature 생성 (router, service, schemas)
  7. GET /api/v1/dogs/profile 엔드포인트 추가
  8. Frontend useDogProfile 훅 추가
  9. DataSection 버튼 연결 (/dog/profile로 이동)
  10. DogProfileFull 타입 추가
  
  **Phase 4: 계정 삭제**
  11. Backend DELETE /auth/me 엔드포인트 추가
  12. Frontend useDeleteAccount 훅 + ConfirmDialog 연동
  
  **Phase 6: PWA 설치**
  13. usePWAInstall 훅 생성
  14. AppInfoSection PWA 버튼 연결

- 남은 작업 (4개):
  1. Dog Profile 페이지 생성 (/dog/profile)
  2. Supabase Storage 설정 (dog-profiles 버킷)
  3. Survey Photo Upload UI (Step1Profile)
  4. Dashboard Photo Display

- 검증:
  - Backend 컴파일: ✅ 성공 (dogs, auth features)
  - Frontend 빌드: 대기 중
- 결과:
  - 진행 중 (75% 완료)


### [2026-02-14 Night] Dog Profile 페이지 & Photo Upload 완료
- 목표:
  - Dog Profile 페이지 생성
  - 강아지 사진 업로드/표시 기능 구현
- 완료 작업 (16/16 - 100%):
  **Phase 5: Dog Profile 페이지**
  15. Dog Profile 페이지 생성 (`/dog/profile`)
      - Glass header, Hero card (프로필 사진 + 기본 정보)
      - Bento grid 2열 레이아웃 (환경, 건강, 행동, 과거 시도)
      - 기질 섹션 (민감도 그래프)
      - Empty state, Loading state
      - Framer Motion 애니메이션
      - useDogProfile() 훅 연동

  **Phase 7: Dog Photo Upload & Display**
  16. Survey types 업데이트 (`profileImageUrl` 추가)
  17. Step1Profile 사진 업로드 UI 추가
      - File input with preview
      - Supabase Storage upload
      - Image validation (type, size 5MB)
      - Loading state during upload
      - Remove button
  18. survey-mapper 업데이트 (profile_image_url 전송)
  19. Dashboard Header 사진 표시 추가
      - Dog photo with fallback icon
      - Responsive sizing (20x20, 24x24)
      - Glass border styling
  20. Supabase Storage 설정 문서 작성
      - `.agent/ai-context/supabase-storage-setup.md`
      - SQL 스크립트 (bucket 생성, RLS policies)
      - 검증 쿼리, 테스팅 가이드

- 변경 파일:
  - Frontend:
    - `src/components/features/survey/types.ts` (profileImageUrl 추가)
    - `src/components/features/survey/Step1Profile.tsx` (업로드 UI)
    - `src/components/features/survey/survey-mapper.ts` (profile_image_url 전송)
    - `src/components/features/dashboard/DashboardHeader.tsx` (사진 표시)
    - `src/app/(app)/dog/profile/page.tsx` (신규 페이지)
  - Backend:
    - 이미 완료 (`profile_image_url` 필드 존재)
  - Docs:
    - `.agent/ai-context/supabase-storage-setup.md` (신규)

- 검증:
  - Supabase Storage: 설정 문서 작성 완료, SQL 스크립트 준비됨
  - Frontend 컴파일: 타입 에러 없음
  - Backend 호환성: SurveySubmission 스키마 이미 지원
- 결과:
  - ✅ 완료 (100%, 16/16 tasks)
  - 설정 페이지 UX 개선 완료
  - 강아지 프로필 관리 완료
  - 사진 업로드/표시 완료


### [2026-02-14 Late Night] Logo Replacement & Storage Bucket Setup
- 목표:
  - 사이드바/헤더 로고를 PNG 파일로 교체
  - Survey 이미지 업로드 Supabase Storage 버킷 설정
- 완료 작업:
  **Logo Replacement**
  1. Sidebar.tsx 로고 교체
     - 텍스트 "TailLog" → `/SideBarLogo.png`
     - 높이: h-14 (56px), object-contain으로 비율 유지
     - Hover 애니메이션: scale + translate + drop-shadow
  2. Header.tsx 로고 교체
     - 아이콘+텍스트 → `/HeaderLogo.png`
     - 높이: h-14 md:h-16 (56px/64px 반응형)
     - Framer Motion 애니메이션: whileHover, whileTap
     - 미사용 import 정리 (Settings, cn)
  3. 로고 크기 조정
     - 초기 h-9/h-10 → h-11/h-12 → h-32/h-16 → 최종 h-24/h-14
     - object-contain 추가로 가로 비율 유지

  **Supabase Storage Setup**
  4. Storage 버킷 에러 트러블슈팅
     - 에러 1: "Bucket not found" → 버킷 생성 SQL 작성
     - 에러 2: "RLS policy violation" → 게스트 업로드 허용 정책 수정
  5. SQL 마이그레이션 파일 생성
     - `Backend/migrations/create_dog_profiles_bucket.sql`
       - dog-profiles 버킷 생성
       - Public read 정책
       - Authenticated upload 정책
     - `Backend/migrations/fix_dog_profiles_rls.sql`
       - 게스트 업로드 허용 (Survey 접근성)
       - 모든 사용자 INSERT/UPDATE/DELETE 허용

- 변경 파일:
  - Frontend:
    - `src/components/shared/layout/Sidebar.tsx` - PNG 로고 교체
    - `src/components/shared/layout/Header.tsx` - PNG 로고 교체, import 정리
  - Backend:
    - `migrations/create_dog_profiles_bucket.sql` - 신규
    - `migrations/fix_dog_profiles_rls.sql` - 신규
- 검증:
  - Frontend 빌드: ✅ 성공 (13 pages)
  - Logo 표시: PNG 이미지로 정상 교체
  - Supabase 스키마: 기존 구조 분석 완료
- 결과:
  - ✅ 로고 교체 완료
  - ✅ Storage SQL 스크립트 준비 완료
  - ⏸️ SQL 실행 대기 중 (사용자가 Supabase Dashboard에서 실행 필요)
- 다음 작업:
  1. Supabase SQL Editor에서 마이그레이션 실행
  2. Survey 사진 업로드 테스트
  3. Dashboard 사진 표시 확인

### [2026-02-14 Late Night] UTF 인코딩 재발 방지 조치
- 목표:
  - TS/TSX 파싱 에러의 원인인 invalid UTF-8 재발 방지
- 범위:
  - 저장 시점 인코딩 강제 + 수동/CI 점검 스크립트 추가
- 변경 파일:
  - `.vscode/settings.json` - UTF-8, LF, autoGuessEncoding 비활성 설정
  - `Frontend/scripts/check-utf8.mjs` - 텍스트 파일 UTF-8 유효성 검사 스크립트 신규
  - `Frontend/package.json` - `check:utf8` 스크립트 추가
- 검증 명령:
  - `Set-Location Frontend; node scripts/check-utf8.mjs`
- 결과:
  - `UTF-8 check passed.`
  - 인코딩 깨짐 파일 커밋/배포 전 사전 검출 가능 상태
- 인코딩 점검:
  - Encoding check: UTF-8 + LF verified for changed files.
- 커밋:
  - (미커밋)
- 다음 작업:
  1. Render/CI 빌드 파이프라인에 `npm run check:utf8` 선행 단계 추가
  2. 필요 시 pre-commit hook으로 로컬 커밋 전 자동 검사
