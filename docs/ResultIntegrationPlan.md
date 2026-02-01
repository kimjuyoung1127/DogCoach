# Result Page Integration & Data Strategy (Post-Survey Context)

이 문서는 설문조사(`Survey`) 직후 노출되는 `ResultPage`의 데이터 전략을 정의합니다. **이 시점에는 과거 행동 기록이 존재하지 않으므로**, 오직 **설문에서 수집된 `dogs` (기본 정보)와 `dog_env` (환경/성향)** 데이터만을 바탕으로 분석 결과를 생성해야 합니다.

## 1. 데이터 소스 및 매핑 (Data Source Mapping)

모든 분석은 유저가 방금 입력한 "따끈따끈한" 설문 응답에 기반합니다.

### 1.1 ResultHeader (프로필 및 핵심 문제)
*   **Data Source**: `dogs`, `dog_env`
*   **Logic**:
    *   `dogs.name`: "00이의 분석 결과" 등 개인화 타이틀에 사용.
    *   **`dog_env.chronic_issues[0]`**: 설문 Step 4에서 선택한 **'가장 큰 고민'**을 메인 진단 키워드로 노출 (예: "분리불안", "경계성 짖음").

### 1.2 BarkingHeatmap (초기 데이터 시각화)
과거 로그가 없으므로 두 가지 전략 중 하나를 선택합니다.
*   **Strategy A (Seed Data)**: 설문 완료 시 생성된 **단 1개의 Seed Log**를 시각화하여, "방금 말씀하신 상황이 기록되었습니다"라는 피드백을 줌.
*   **Strategy B (Simulation)**: `dog_env.triggers`와 `household_info`를 분석하여 **"무엇이, 언제 짖음을 유발하는지"** 시뮬레이션된 패턴을 보여줌. (권장: 초기엔 Seed Data 시각화가 기술적으로 더 명확함)

### 1.3 AnalysisRadarChart (기질 분석)
설문 Step 7의 응답이 직접적인 소스입니다.
*   **Data Source**: `dog_env.temperament`
*   **Mapping**:
    *   설문 5점 척도 -> 레이더 차트의 `Sensitivity`(민감도) 축.
    *   견종(`dogs.breed`) 기본 특성 + 설문 응답 -> `Energy Level` 축 추정.

### 1.4 Smart Coaching (Static Curriculum Mapping)
**LLM 호출 비용을 0으로 만드는 100% 정적 매핑 전략**입니다.
이 페이지는 온보딩 직후 1회성으로 소비되므로, `dog_env`의 데이터를 `curriculum.ts`와 매핑하여 즉각적인 진단을 제공합니다.

*   **Logic**: `dog_env.chronic_issues` (설문 고민) -> `curriculum.ts` (정의된 커리큘럼) 매핑.
*   **Benefits**: API 비용 발생 없음, 로딩 시간 없음 (Instant Load).

#### 1.4.1 Mapping Logic & Security
`C:\DogCoach\Frontend\src\data\curriculum.ts`의 데이터 구조를 활용하되, **비구독자에게는 상세 데이터를 렌더링하지 않습니다.**

1.  **Diagnosis (진단)**:
    *   **All Users**: `TrainingCourse.title` 및 `description` 노출.
2.  **Solution Preview (솔루션 - Secure Blur)**:
    *   **Pro User**: 전체 단계 렌더링.
    *   **Free User**:
        *   **Title**: 1단계 제목만 노출.
        *   **Body**: **실제 텍스트를 렌더링하고 CSS로 가리는 방식이 아님.** (Data Leakage 방지)
        *   **Implemenation**: 의미 없는 `Skeleton UI` 또는 `Lorem Ipsum` 패턴을 블러 처리하여 보여줌. **"Inspect Element(개발자 도구)"로도 내용을 볼 수 없게 원천 차단.**

---

## 2. 데이터 흐름 (Data Flow: Survey -> Result)

1.  **Survey Complete**: 유저가 마지막 질문 응답 후 '제출' 클릭.
2.  **Backend Processing**:
    *   `users`, `dogs`, `dog_env` 저장.
    *   `behavior_logs`에 Seed Log 생성 (선택).
    *   **LLM 생성 로직 없음 (Skipped).**
3.  **Result Page Render**:
    *   프론트엔드에서 `dog_env`의 issue 키워드를 보고 `curriculum.ts`에서 맞는 코스를 찾아 즉시 렌더링.
    *   **메모리 최적화**: 비구독자 모드에서는 `MissionActionOverlay` 등 무거운 인터랙션 컴포넌트를 마운트하지 않음.

---

## 3. 구독자 vs 비구독자 콘텐츠 분리 (Data Visibility + Security)

**핵심 정보 유출(Data Leakage) 및 메모리 낭비 방지**를 위해 렌더링 레벨에서 데이터를 제어합니다.

| UI Component | Free User (비구독) | Pro User (구독) | Implementation Logic |
| :--- | :--- | :--- | :--- |
| **진단 (Diagnosis)** | **과정 소개** 노출 | **과정 소개** 노출 | 동일 렌더링 |
| **솔루션 (Plan)** | **Secure Locked Mode** <br> 실제 팁 텍스트는 **DOM에 존재하지 않음**. <br> 더미(Dummy) 블러 UI만 렌더링. | **Unlocked Mode** <br> 전체 텍스트 및 상세 가이드 렌더링. | 조건부 렌더링 (`UserRole` Check) |
| **미션 (Mission)** | 맛보기 미션 (Day 1-Step 1) 만 수행 가능 | 전체 커리큘럼 접근 가능 | `MissionActionOverlay` 조건부 호출 |

---

## 4. Implementation Checklist

- [ ] **Backend**: `POST /api/v1/onboarding/survey` 구현 (DB 저장만 수행).
- [ ] **Frontend**: `curriculum.ts` 매핑 로직 구현.
- [ ] **Security**: `LockedAnalysisSection`이 실제 데이터를 prop으로 받지 않고, **더미 데이터**를 시각화하도록 수정 (정보 유출 방지).

---

## 4. 결론 및 확인

*   **Double Check**: Result 페이지는 오직 **`dog_env` (환경/성향)**, **`dogs` (프로필)**, 그리고 막 생성된 **Seed Log** 1개에만 의존합니다.
*   **Historical Data**: `behavior_logs`의 통계(주간/월간 추이 등)는 이 단계에서 존재하지 않으므로 보여주지 않습니다.
