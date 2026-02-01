좋습니다! 제가 위 내용을 한국어로 풀어서 정리해드릴게요.  

---

# DogCoach 🐶  
> 데이터 기반 행동 코칭 플랫폼 – 행복한 반려견과 보호자를 위해  

**DogCoach**는 반려견의 행동을 추적·분석하고, 데이터 기반 인사이트와 AI 코칭을 통해 훈련을 개선하는 종합 애플리케이션입니다.  

---

## 📋 프로젝트 배경  

이 프로젝트는 **주관적인 훈련 방식의 한계**를 해결하기 위해 만들어졌습니다:  
- **객관적 기록**: 선행(Antecedent), 행동(Behavior), 결과(Consequence)를 빠르고 상세하게 기록  
- **상황 인식**: 사용자의 생활 패턴에 맞춘 **시간대(Timezone) 기반 데이터 처리**  
- **AI 코칭(예정)**: 반려견의 환경과 과거 기록을 반영한 **맞춤형 RAG 기반 조언** 제공  

---

## 🏗️ 아키텍처  

DogCoach는 **기능(Feature) 기반 아키텍처**를 따르며, 모듈성과 확장성을 보장합니다.  

```
DogCoach/
├── Frontend/           # Next.js 웹 애플리케이션
│   ├── src/app/        # App Router (대시보드, 설문, 로그)
│   └── ...
├── Backend/            # FastAPI 서버
│   ├── app/
│   │   ├── core/       # 전역 설정, DB, 보안
│   │   ├── shared/     # 공용 모델 & 유틸
│   │   └── features/   # 비즈니스 로직 (Auth, Log, Coach...)
│   │       ├── router.py      # 컨트롤러
│   │       ├── service.py     # 서비스 로직
│   │       └── repository.py  # DB 접근
│   └── tests/          # Pytest 테스트 코드
└── docs/               # 프로젝트 문서
```

---

## 🛠️ 기술 스택  

- **백엔드**: Python 3.10+, FastAPI, SQLAlchemy(비동기), Pydantic v2  
- **프론트엔드**: TypeScript, Next.js 14, TanStack Query (React Query), Zustand, Tailwind CSS  
- **데이터베이스**: PostgreSQL (Supabase), AsyncPG  
- **인프라**: Supabase Auth, OpenAI API  

---

## 🚀 시작하기  

### 준비물  
- Python 3.10+  
- Node.js 18+  
- Supabase 프로젝트 (URL & Key)  

### 백엔드 실행  
1. Backend 디렉토리 이동  
   ```bash
   cd Backend
   ```
  2. 가상환경 생성 및 활성화  
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```
  3. 의존성 설치  
   ```bash
   pip install -r requirements.txt
   ```
  4. `.env` 설정  
   ```env
   DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/postgres
   SECRET_KEY=your_jwt_secret
   # ... see .env.example
   ```
  5. 서버 실행  
   ```bash
   python -m uvicorn app.main:app --reload
   ```
  
### 프론트엔드 실행  
1. Frontend 디렉토리 이동  
   ```bash
   cd Frontend
   ```
  2. 의존성 설치  
   ```bash
   npm install
   ```
  3. 개발 서버 실행  
   ```bash
   npm run dev
   ```
  
---

## ✅ 테스트  

백엔드에는 **Pytest** 기반 단위 테스트가 포함되어 있습니다 (`Auth`, `Log`).  

```bash
cd Backend
python -m pytest tests
```
  
---

## 📅 로드맵 & 진행 상황  

- [x] **1단계: 기반 구축** (DB, 보안, 모델)  
- [x] **2단계: 온보딩** (설문, 게스트/유저 인증, OAuth)  
- [x] **3단계: 핵심 루프** (로그 기록, 대시보드, 시간대 지원)  
- [/] **4단계: AI 지능** (실시간 AI 코칭 API, RAG 기반 분석)  
- [ ] **5단계: 시각화** (히트맵, 미션 추적)  
- [ ] **6단계: 최적화** (PWA, 오프라인 동기화)  

---

## 📚 문서  

자세한 문서는 `docs/` 폴더에 있습니다:  
