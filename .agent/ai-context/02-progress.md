# Progress

Last Updated: 2026-02-14

## 2026-02-14
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

## 2026-02-12 (요약)
- guest -> user 데이터 마이그레이션 엔드포인트 추가 (`POST /auth/migrate-guest`).
- dog 소유권 검증 강화, timezone 일관성 적용, 캐시 invalidation 정밀화.
- Supabase 스키마 복원(11 테이블, 7 트리거, RLS), Frontend/Backend 빌드 검증 통과.
