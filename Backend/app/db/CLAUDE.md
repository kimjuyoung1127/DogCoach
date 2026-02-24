# Backend DB Directory
데이터베이스 연결과 관련된 설정을 담당하는 디렉토리입니다.

## 주요 관리 파일
- `session.py`: SQLAlchemy 비동기 엔진 및 세션 팩토리 설정.
- `base.py`: 모든 모델이 상속받는 Declarative Base 정의 및 통합.

## 가이드라인
- 모든 DB 작업은 `AsyncSession`을 통해 비동기로 수행합니다.
- 복잡한 쿼리는 전용 repository 클래스에서 관리하며, 서비스 레이어에서는 이를 호출하는 형태를 권장합니다.
- 트랜잭션 관리는 가급적 의존성 주입(Depends) 레벨에서 처리합니다.
