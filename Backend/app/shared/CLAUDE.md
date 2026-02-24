# Backend Shared Directory
애플리케이션 전반에서 공유되는 공통 데이터 구조와 유틸리티를 관리하는 디렉토리입니다.

## 구성 요소
- `models.py`: SQLAlchemy 기반의 모든 DB 테이블 정의 (마이그레이션의 소스).
- `constants.py`: 전역에서 사용되는 상수 정의.

## 가이드라인
- `models.py` 수정 시 반드시 마이그레이션 파일을 생성해야 합니다.
- FE의 `src/lib/types.ts`와 일관성을 유지해야 하며, 변경 사항은 상호 문서화합니다.
- 공통 Enum은 이곳에서 정의하여 중복을 방지합니다.
