# Survey & Onboarding Strategy (Updated)

테일로그(TailLog)'의 브랜드 아이덴티티와 랜딩페이지의 전략적 흐름을 온보딩 설문(/checkup)에 그대로 녹여내는 것은 유저의 이탈을 막고 신뢰를 형성하는 데 매우 중요합니다.

## 1. 논리적 데이터 매칭 & 설문 단계 (Revised 7 Steps)
브리딩 설문 요소와 AI 코칭을 위한 핵심 데이터를 확보하기 위해 설문 과정을 7단계로 세분화했습니다.

### Step 1: 기본 정보 (Basic Info)
반려견의 생물학적 기초 정보를 수집합니다.
*   **수집 항목**: 이름, 견종, 생년월일, 성별, **몸무게, 입양일**
*   **Schema**: `dogs` 테이블 + `dog_env.profile_meta` (weight, adoption_date)
*   **Why**: 몸무게와 입양일은 약물 복용량, 사회화 시기(퍼피 시기 경험) 판단에 필수적입니다.

### Step 2: 환경 설정 (Environment)
반려견이 생활하는 물리적/사회적 환경을 파악합니다.
*   **수집 항목**: 주거 형태(아파트/주택), 가족 구성원 수, **주 양육자**
*   **Schema**: `dog_env.household_info` (type, family_count, primary_carer)
*   **Why**: 주 양육자가 누구냐(어머니, 자녀, 본인)에 따라 AI 코칭의 어조(Tone)를 설정합니다. (예: 어머니라면 더 부드럽게)

### Step 3: 건강/영양 (Health & Nutrition)
신체적 불편함이 행동 문제의 원인이 아닌지 확인하고, 보상 시스템을 설계합니다.
*   **수집 항목**: 기저 질환, **좋아하는 간식/보상**
*   **Schema**: `dog_env.health_meta`, `dog_env.rewards_meta` (favorite_treats, play_style)
*   **Why**: "좋아하는 간식"을 알아야 AI가 솔루션 제안 시 "터그 놀이 대신 고구마를 주세요"라고 구체적인 Action Item을 줄 수 있습니다.

### Step 4: 문제 행동 (Behavior - B)
가장 해결하고 싶은 고민을 우선순위화합니다.
*   **수집 항목**: 가장 큰 고민 (Top 3 선택)
*   **Schema**: `dog_env.chronic_issues` (list of issues)
*   **Cold Start 전략**: 설문 완료 즉시, 선택한 문제 행동을 `occurred_at: NOW()`로 하여 `behavior_logs`에 **Seed Data를 1개 자동 생성**합니다. (대시보드가 비어있는 것 방지)

### Step 5: 원인/상황 (Antecedent - A)
문제 행동을 유발하는 트리거를 식별합니다.
*   **수집 항목**: 짖거나 반응하게 만드는 구체적 상황 (초인종, 배달 오토바이, 천둥 등)
*   **Schema**: `dog_env.triggers` (JSON array)
*   **Why**: AI가 "초인종 소리"를 '경계성 짖음'으로 분류하고 RAG 검색 키워드로 활용합니다.

### Step 6: 대처 경험 (Consequence - C)
과거의 실패 경험을 수집하여 중복된 조언을 피합니다.
*   **수집 항목**: **실패했던/효과 없던 대처법**
*   **Schema**: `dog_env.past_attempts` (JSON array)
*   **Why**: 단순 반응이 아니라 '효과 없던 방법'을 저장해야, AI가 **"지난번에 무시는 효과가 없었으니, 이번엔 자리비움을 해보세요"**라고 차별화된 제안이 가능합니다.

### Step 7: 기질 (Temperament)
반려견의 타고난 성향을 파악합니다.
*   **수집 항목**: 낯선 사람/소리에 대한 민감도 (5점 척도)
*   **Schema**: `dog_env.temperament` (sensitivity_score, energy_level)
*   **Why**: AI 분석의 '성향(Temperature)' 파라미터로 활용하여 훈련 강도를 조절합니다.

---

## 2. 시각적 연속성 및 브랜드 보이스 (Visual & Voice)
(기존 내용 유지)
*   **Brand Blobs & 애니메이션**: Framer Motion 활용.
*   **초개인화 마이크로 카피**: 유저가 입력한 강아지 이름(예: "머루")을 설문 질문에 지속 노출.
*   **Lottie 활용**: 질문 성격에 맞는 애니메이션 배치.

## 3. 이탈 방지를 위한 UX 장치
(기존 내용 유지)
*   **대화형 프로그레스 바**: 목표 지점으로 이동하는 시각적 피드백.
*   **중간 저장 및 카카오 싱크**: Step 4 이후 로그인 유도 고려.

### Technical Note: Guest User Logic
1.  **Identification**: `anonymous_sid` 쿠키를 사용하여 비로그인 유저를 식별합니다.
2.  **Schema**: `dogs` 테이블의 `user_id`는 Nullable이며, `anonymous_sid` 컬럼에 UUID가 저장됩니다.
3.  **Flow**: 설문 제출 시 토큰이 없으면 백엔드에서 `anonymous_sid`를 생성하고 응답 헤더(Set-Cookie)로 내려줍니다.

## 4. 결과 페이지 브릿지
(기존 내용 유지)
*   **로딩 애니메이션**: AI 분석 중 연출.
*   **맛보기 히트맵**: 입력된 데이터를 바탕으로 즉시 시각화.
