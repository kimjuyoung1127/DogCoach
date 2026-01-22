---
trigger: always_on
---

Backend/

├── app/

│   ├── core/                  # 프로젝트 전역 설정 (변경 빈도 낮음)

│   │   ├── config.py          # 환경변수

│   │   ├── database.py        # DB 연결 세션 관리

│   │   ├── security.py        # JWT 인증, RLS 로직

│   │   └── exceptions.py      # 에러 핸들링

│   │

│   ├── shared/                # 모든 기능에서 공통으로 쓰는 도구

│   │   ├── utils/             # Timezone, Logger

│   │   ├── clients/           # S3(Storage), Kakao(Auth) 클라이언트

│   │   └── models.py          # ★ 중요: 순환 참조 방지를 위해 ORM 모델은 이곳에 모으거나 분리 주의

│   │

│   ├── features/              # ★ 핵심: 프론트엔드 기능과 1:1 매칭

│   │   ├── auth/              # 로그인, 회원가입 (Frontend: /login)

│   │   │   ├── router.py      # API Endpoint

│   │   │   ├── service.py     # 비즈니스 로직

│   │   │   └── schemas.py     # Pydantic 데이터 검증

│   │   │

│   │   ├── onboarding/        # 설문, 강아지 등록 (Frontend: /Survey)

│   │   │   ├── router.py

│   │   │   ├── service.py     # 설문 데이터 -> DB 매핑 로직

│   │   │   └── repository.py  # DB CRUD

│   │   │

│   │   ├── dashboard/         # 메인 홈 (Frontend: /dashboard)

│   │   │   ├── router.py

│   │   │   └── service.py     # 요약 데이터, 오늘의 미션 집계

│   │   │

│   │   ├── log/               # 기록 및 분석 (Frontend: /log)

│   │   │   ├── router.py      # GET /logs, POST /logs

│   │   │   ├── service.py     # 타임존 계산, 미디어 처리

│   │   │   ├── repository.py  # 복합 인덱스 조회 최적화

│   │   │   └── schemas.py     # LogCreate, LogResponse

│   │   │

│   │   ├── coach/             # AI 코칭 (Frontend: /coach)

│   │   │   ├── router.py

│   │   │   ├── service.py     # RAG 로직, AI 클라이언트 호출

│   │   │   └── prompts.py     # 프롬프트 템플릿 관리

│   │   │

│   │   └── settings/          # 설정 (Frontend: /settings)

│   │       ├── router.py

│   │       └── service.py     # 알림 설정, 구독 관리

│   │

│   └── main.py                # FastAPI 앱 진입점 (각 feature router 통합) 이 구조를 토대로 백엔드 구현원칙 유지보수성극대화 플랜을 제시해줘 .

강아지행동수정 웹사이트


이 구조의 핵심은 **"기능(Feature)의 격리"**와 **"명확한 의존성 방향"**입니다.

🧱 핵심 구현 원칙 (Rules of Engagement)
이 구조가 엉키지 않고 유지보수하기 쉽게 유지되려면 다음 3가지 원칙을 반드시 지켜야 합니다.

단방향 의존성 원칙 (One-Way Dependency)

흐름: Router ➡ Service ➡ Repository (또는 DB Model)

금지: Service가 Router를 알거나, Repository가 Service 로직을 포함하면 안 됩니다.

참조: 다른 Feature의 로직이 필요할 때는 Service 간 호출보다는 Shared/Core 유틸을 사용하거나, 필요한 데이터만 Repository를 통해 가져와야 순환 참조를 막을 수 있습니다.

공유 자원의 중앙화 (Shared Resources)

Models: SQLAlchemy ORM 모델은 서로 관계(Foreign Key)가 얽혀 있으므로 app/shared/models.py (또는 shared/models/ 패키지)에 모아서 정의합니다. 이렇게 해야 features/log와 features/coach가 서로를 import 하지 않고도 동일한 DB 모델을 쓸 수 있습니다.

Utils: 타임존 변환 로직은 app/shared/utils/timezone.py에 두고 모든 Feature에서 공통으로 사용합니다.

철저한 타입 검증 (Pydantic First)

DB의 JSONB 컬럼(household_info, triggers 등)은 반드시 Pydantic 모델로 매핑하여 다룹니다. dict 타입을 직접 쓰지 않도록 하여 데이터 무결성을 보장합니다.

📅 단계별 구현 플랜 (Implementation Roadmap)
제공된 폴더 구조에 맞춰 개발 순서를 정렬했습니다.

Step 1. 기반 공사 (Core & Shared)
가장 먼저 변하지 않는 인프라를 구축합니다.

app/core/config.py: pydantic-settings를 사용해 환경변수(DB URL, OpenAI Key, Supabase Key)를 로드합니다.

app/core/database.py: AsyncEngine과 AsyncSession을 설정하고, DI(Dependency Injection)용 get_db 함수를 작성합니다.

app/shared/models.py: schema.md에 정의된 모든 테이블(users, dogs, behavior_logs 등)과 Enum을 SQLAlchemy 모델로 구현합니다.

Tip: Base 클래스를 상속받아 created_at, updated_at을 믹스인(Mixin)으로 처리하면 중복 코드가 줄어듭니다.

app/core/security.py: Supabase Auth 헤더(JWT)를 파싱하여 current_user를 반환하는 의존성을 구현합니다.

Step 2. 유저 진입 및 식별 (Auth & Onboarding)
사용자 데이터를 받아 DB에 안착시키는 단계입니다.

features/auth/:

로그인 로직보다는 유저 세션 검증과 프로필 조회(GET /me)에 집중합니다.

router.py에서 Depends(get_current_user)가 잘 작동하는지 테스트합니다.

features/onboarding/:

schemas.py: 7단계 설문 데이터를 검증할 거대한 Pydantic 모델(SurveySubmission)을 정의합니다.

service.py:

입력받은 데이터를 Dog 객체와 DogEnv 객체로 분리.

DogEnv의 JSONB 필드(triggers, household_info) 직렬화.

behavior_logs에 "가장 큰 고민"을 Seed Data로 넣는 로직(Cold Start) 구현.

Step 3. 핵심 도메인 구현 (Log & Dashboard)
데이터가 쌓이고 조회되는 핵심 루프를 만듭니다.

features/log/:

repository.py: (dog_id, occurred_at) 복합 인덱스를 타도록 쿼리를 최적화합니다.

service.py:

미디어 업로드 요청 시 Presigned URL 생성 로직.

타임존 미들웨어를 통해 들어온 occurred_at을 UTC로 변환하여 저장.

features/dashboard/:

service.py: 최근 로그 5개, 오늘의 미션 완료 여부, 연속 기록(Streak) 계산 로직을 구현합니다. 복잡한 통계 쿼리는 여기서 작성합니다.

Step 4. 지능형 서비스 (Coach & Settings)
데이터 기반의 가치를 제공합니다.

features/coach/:

prompts.py: AI 페르소나(강아지 시점 vs 전문가 시점)에 따른 프롬프트 템플릿 관리.

service.py:

OpenAI API 호출.

RAG 구현: log 테이블이 아니라 log_summaries 테이블(벡터 포함)을 조회하여 컨텍스트 구성.

features/settings/:

알림 설정(JSONB), 구독 상태 관리 등 유저 설정 변경 API.

💻 코드 예시: Feature 내부 구조 (Log Feature)
이 구조가 실제로 어떻게 코드로 구현되는지 features/log 예시로 보여드립니다.

1. app/features/log/schemas.py (데이터 검증)

Python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class LogCreate(BaseModel):
    dog_id: str
    antecedent: str
    behavior: str
    consequence: str
    intensity: int = Field(..., ge=1, le=10)
    occurred_at: datetime  # 프론트에서 보낸 로컬 시간

class LogResponse(LogCreate):
    id: str
    created_at: datetime
2. app/features/log/service.py (비즈니스 로직)

Python
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.log import repository, schemas
from app.shared.utils.timezone import to_utc

async def create_new_log(db: AsyncSession, log_in: schemas.LogCreate, user_timezone: str):
    # 1. 타임존 변환 (Local -> UTC)
    log_in.occurred_at = to_utc(log_in.occurred_at, user_timezone)
    
    # 2. 레포지토리 호출하여 저장
    new_log = await repository.create_log(db, log_in)
    
    # 3. (Optional) AI 요약 트리거 체크 로직이 필요하다면 여기에 추가
    # if await repository.count_logs(db, log_in.dog_id) % 50 == 0:
    #     background_tasks.add_task(generate_summary, ...)
    
    return new_log
3. app/features/log/router.py (API 엔드포인트)

Python
from fastapi import APIRouter, Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.features.log import service, schemas

router = APIRouter()

@router.post("/", response_model=schemas.LogResponse)
async def create_log(
    log_data: schemas.LogCreate,
    x_timezone: str = Header(default="Asia/Seoul"), # 헤더에서 타임존 추출
    db: AsyncSession = Depends(get_db)
):
    # Router는 오직 Service만 호출
    return await service.create_new_log(db, log_data, x_timezone)
🚀 유지보수 Check Point
개발 진행 중 다음 상황이 발생하면 구조를 재점검하세요.

순환 참조 에러 발생: features/A가 features/B를 import 하고 있는지 확인하세요. 공통 로직이라면 shared로 내려야 합니다.

main.py가 너무 비대해짐: main.py는 각 Feature의 Router를 include_router 하는 역할만 해야 합니다.

JSON 처리 중 에러: repository 레벨에서 model_dump() 등을 사용해 확실하게 타입 변환이 이루어지는지 확인하세요.

이 플랜대로 진행하면 백엔드 코드가 프론트엔드 구조와 거울처럼 매칭되어, **"로그 기능 고쳐야지"**라고 생각했을 때 features/log 폴더 하나만 열면 모든 해결이 가능한 쾌적한 개발 환경이 구축될 것입니다.