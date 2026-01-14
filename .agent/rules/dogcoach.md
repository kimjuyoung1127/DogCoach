---
trigger: always_on
---

🎯 CLI 도구가 지켜야 할 핵심 원칙
1. 파일 네이밍 규칙
파일 타입	규칙	예
React 컴포넌트	PascalCase + .tsx	BehaviorCard.tsx
TypeScript 훅	camelCase + .ts	useBehaviorLogs.ts
Python 모듈	snake_case + .py	behavior_log_service.py
데이터베이스 테이블	snake_case + 복수형	behavior_logs
상수	UPPER_SNAKE_CASE	API_BASE_URL
2. 프로젝트 구조 (반드시 준수)
# Project Structure

## Frontend (Next.js)
Frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/            # Public pages (Landing, Login, Checkup, Result)
│   │   ├── (app)/               # Protected app pages (Dashboard, Log, Analytics, etc.)
│   │   └── api/                 # Next.js API Routes (Auth, proxy, etc.)
│   ├── components/
│   │   ├── cards/               # Business UI Cards (Behavior, Stats, Mission)
│   │   ├── charts/              # Visualizations (Heatmap, Trends)
│   │   ├── features/            # Feature-specific logic grouping
│   │   ├── forms/               # Complex forms (Login, LogEntry, Profile)
│   │   ├── layout/              # Global layout components (Header, Sidebar)
│   │   ├── shared/              # Reusable shared components
│   │   └── ui/                  # Atomic UI components (shadcn/ui)
│   ├── hooks/                   # Custom Hooks (useAuth, useLogs, etc.)
│   ├── lib/                     # Libraries & Utils (Supabase, API client, Zod)
│   ├── store/                   # Global State (Zustand)
│   ├── styles/                  # Global CSS
│   └── types/                   # Type Definitions
└── ...

## Backend (FastAPI)
Backend/
├── alembic/                     # Database Migrations
├── app/
│   ├── ai/                      # AI Modules (RAG, Prompts, Vectorstore)
│   ├── api/
│   │   └── v1/                  # API Endpoints (Auth, Dogs, Logs, Coaching)
│   ├── core/                    # Core Configuration & Security
│   ├── db/                      # Database base & session info
│   ├── middleware/              # Middleware (CORS, Error Handling)
│   ├── models/                  # SQLAlchemy ORM Models
│   ├── repositories/            # Database Access Layer (CRUD)
│   ├── schemas/                 # Pydantic Data Schemas
│   ├── services/                # Business Logic Services
│   ├── tasks/                   # Background Tasks (Scheduler, Notifications)
│   ├── utils/                   # Helpers (Logger, Validators)
│   └── main.py                  # Application Entry Point
├── tests/                       # Unit & Integration Tests
└── ...

3. 코딩 규칙 요약
TypeScript
typescript
// ✅ 올바름
interface ComponentProps {
  id: string;
  onDelete?: (id: string) => void;
}

export const MyComponent = memo(function MyComponent(props: ComponentProps) {
  // ...
});

MyComponent.displayName = 'MyComponent';

// ❌ 금지
export function MyComponent(props: any) { }  // any 사용 금지
const Component = (props) => { }              // 타입 정의 필수
Python
python
# ✅ 올바름
@router.post("/logs", response_model=BehaviorLogResponse)
async def create_log(
    log_data: BehaviorLogCreate,
    db: Session = Depends(get_db)
):
    """행동 로그 생성 - 명확한 docstring 필수"""
    service = LogService(db)
    return await service.create_log(log_data)

# ❌ 금지
def create_log(log_data):          # 타입 힌트 필수
    # 주석만 있고 docstring 없음
4. 컴포넌트 구조 패턴
폼 컴포넌트 예시
typescript
// components/forms/BehaviorLogForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { behaviorLogSchema } from '@/lib/validators';

export function BehaviorLogForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(behaviorLogSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* shadcn/ui 컴포넌트 사용 */}
    </form>
  );
}
서비스 계층 예시
python
# app/services/behavior_analysis_service.py
class BehaviorAnalysisService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = BehaviorLogRepository(db)
    
    async def analyze_patterns(self, dog_id: str) -> dict:
        """반려견 행동 패턴 분석"""
        # 구현
5. API 엔드포인트 설계
text
GET    /api/v1/dogs/:dog_id/logs          # 조회
POST   /api/v1/dogs/:dog_id/logs          # 생성
PATCH  /api/v1/dogs/:dog_id/logs/:log_id  # 부분 수정
DELETE /api/v1/dogs/:dog_id/logs/:log_id  # 삭제
규칙:

항상 /v1 버전 포함

리소스는 복수형 사용

상태 코드: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found)

6. 데이터베이스 모델
python
class BehaviorLog(Base):
    __tablename__ = "behavior_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dog_id = Column(UUID(as_uuid=True), ForeignKey("dogs.id"), index=True)
    
    # 타임스탐프 필수
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
필수 규칙:

✅ UUID 기본 키 (uuid4)

✅ created_at, updated_at 타임스탐프

✅ 외래키는 nullable=False

✅ 조회 필드에 index=True


1. 프론트엔드 구조 최적화 (mungcoach-frontend)
현재 구조에서 컴포넌트가 많아질 경우 components/forms, components/cards 폴더에 수십 개의 파일이 쌓여 관리가 어려워집니다. 이를 도메인(기능) 중심으로 한 번 더 묶어주는 것이 좋습니다.

💡 제안: src/components/features/ 도입
이유: 특정 페이지에서만 사용되는 비즈니스 로직이 담긴 컴포넌트들을 따로 관리하여, 수정 시 영향 범위를 최소화합니다.

변경 예시:

Plaintext

src/components/
├── features/                # 도메인별 복합 컴포넌트
│   ├── onboarding/          # 설문 단계별 폼들
│   ├── logs/                # ABC 기록 상세 로직
│   ├── dashboard/           # 대시보드 전용 위젯
│   └── coaching/            # AI 리포트 뷰어
├── shared/                  # 프로젝트 전역 재사용 컴포넌트 (Shadcn 래퍼 등)
└── ui/                      # 순수 Shadcn/UI 원자 컴포넌트
💡 제안: Data Fetching 전략 명확화
현재 store/에 Zustand가 있으나, 서버 데이터 캐싱과 로딩 상태 관리를 위해 TanStack Query (React Query) 도입을 강력 추천합니다.

이유: useLogs.ts 같은 훅 내부에서 데이터 fetching 상태(isLoading, isError)를 직접 관리하면 유지보수가 훨씬 편해집니다.

2. 백엔드 구조 최적화 (mungcoach-backend)
백엔드에서 가장 복잡해질 부분은 AI 엔진과 데이터베이스 세션 관리입니다.

💡 제안: app/db/ 폴더 분리
main.py나 dependencies.py에 세션 로직이 섞이지 않도록 분리합니다.

구조:

Plaintext

app/
├── db/
│   ├── base_class.py        # 모든 모델의 Base (Table name 자동 생성 등)
│   └── session.py           # Engine 및 SessionLocal 설정
💡 제안: AI 모듈 내 templates/ 분리
AI 프롬프트는 코드가 아니라 **'설정 데이터'**에 가깝습니다. prompts.py 하나에 몰아넣기보다 상황별로 분리하는 것이 좋습니다.

구조:

Plaintext

app/ai/
├── templates/               # 상황별 프롬프트 (JinJa2 등 활용 권장)
│   ├── daily_report.py
│   ├── emergency_coaching.py
│   └── analysis_logic.py
├── rag_engine.py
└── vectorstore.py