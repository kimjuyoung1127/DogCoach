# SQLAlchemy ORM Models (데이터 모델)

이 디렉토리는 DogCoach 서비스의 데이터베이스 테이블과 매핑되는 SQLAlchemy ORM 모델 클래스들을 포함하고 있습니다.
각 모듈은 도메인 컨텍스트(사용자, 반려견, 로그, 코칭 등)에 따라 분리되어 관리됩니다.

## 📂 파일 및 모듈 설명

### 1. `user.py` (사용자 및 인증)
사용자 계정과 관련된 핵심 도메인입니다.
- **User**: 사용자 기본 정보, 역할(`admin`, `user` 등), 계정 상태 저장.
    - `timezone`: 글로벌 서비스를 대비한 사용자별 시간대 설정.
    - `kakao_sync_id`: 카카오 소셜 로그인 연동 식별자.

### 2. `dog.py` (반려견 프로필)
반려견 정보와 생활 환경을 다룹니다.
- **Dog**: 반려견 이름, 견종, 생년월일, 성별 등 기본 프로필.
    - `profile_image_url`: 대시보드 표시용 프로필 이미지.
- **DogEnv**: 반려견의 주거 환경, 가족 구성원, 건강 상태 등 상세 메타데이터 (JSONB 활용).

### 3. `log.py` (행동 기록)
사용자가 기록하는 문제 행동 로그입니다.
- **BehaviorLog**: ABC(선행사건-행동-결과) 모델 기반의 행동 일지.
    - `is_quick_log`: 퀵 버튼을 통한 간편 입력 여부.
- **MediaAsset**: 로그에 첨부된 사진, 동영상 등 미디어 파일 관리.

### 4. `coaching.py` (AI 코칭)
AI 분석 결과와 솔루션 이행 여부를 추적합니다.
- **AICoaching**: AI가 생성한 일간/주간 리포트 및 조언.
    - `feedback_score`: 코칭 만족도 점수 (RAG 품질 향상용).
- **ActionTracker**: 코칭에서 제안한 미션(Action Item)의 완료 여부 추적.

### 5. `summary.py` (AI 요약)
비용 최적화를 위한 행동 로그 주간 요약본입니다.
- **LogSummary**: 특정 기간(`start_date` ~ `end_date`)의 로그 요약 텍스트 및 임베딩.
    - `embedding`: RAG 검색 시 활용할 `vector(1536)` 데이터.

### 6. `payment.py` (구독 및 결제)
요금제 및 결제 정보를 관리합니다.
- **Subscription**: 사용자의 구독 플랜(`FREE`, `PRO`) 및 다음 결제일 관리.

## 🛠 공통 설계 원칙
- **Base Class**: 모든 모델은 `app.db.base_class.Base`를 상속받습니다.
- **UUID**: 모든 테이블의 Primary Key는 UUID v4를 사용합니다.
- **Timezone**: 모든 시간 데이터는 `DateTime(timezone=True)`를 사용하여 UTC 기준으로 저장합니다.
