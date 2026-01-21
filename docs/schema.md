# Database Schema (Supabase/PostgreSQL)

## 1. Enums (Type Definitions)

| Enum Name | Values | Description |
| :--- | :--- | :--- |
| **`user_role`** | `GUEST`, `USER`, `PRO_USER`, `EXPERT`, `ADMIN` | 사용자 권한 및 등급 |
| **`user_status`** | `ACTIVE`, `INACTIVE`, `BANNED` | 계정 상태 |
| **`plan_type`** | `FREE`, `PRO_MONTHLY`, `PRO_YEARLY` | 구독 요금제 유형 |
| **`dog_sex`** | `MALE`, `FEMALE`, `MALE_NEUTERED`, `FEMALE_NEUTERED` | 반려견 성별 (중성화 여부 포함) |
| **`asset_type`** | `PHOTO`, `VIDEO`, `LOTTIE_SNAPSHOT` | 미디어 파일 유형 |
| **`report_type`** | `DAILY`, `WEEKLY`, `INSIGHT` | AI 리포트/코칭 유형 |
| **`noti_channel`** | `ALIMTALK`, `WEB_PUSH`, `EMAIL` | 알림 발송 채널 |

---

## 2. Tables

### 2.1 Users & Auth (사용자 및 보안)

#### `users`
사용자 기본 정보를 저장합니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 사용자 고유 ID |
| `kakao_sync_id` | `VARCHAR(255)` | **Unique** | 카카오 싱크 식별자 |
| `role` | `user_role` | Default: `'GUEST'` | 사용자 권한 |
| `phone_number` | `VARCHAR(255)` | | 전화번호 (알림톡용) |
| `status` | `user_status` | Default: `'ACTIVE'` | 계정 상태 |
| `timezone` | `VARCHAR(50)` | Default: `'Asia/Seoul'` | 시간대 (글로벌 확장 대비) |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 가입 일시 |
| `updated_at` | `TIMESTAMPTZ` | Default: `NOW()` | 수정 일시 |

#### `subscriptions`
사용자의 구독 상태를 관리합니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 구독 고유 ID |
| `user_id` | `UUID` | **FK** (`users.id`), On Delete: Cascade | 구독 사용자 |
| `plan_type` | `plan_type` | Default: `'FREE'` | 구독 등급 |
| `next_billing_date` | `TIMESTAMPTZ` | | 다음 결제일 |
| `is_active` | `BOOLEAN` | Default: `FALSE` | 구독 활성화 여부 |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |
| `updated_at` | `TIMESTAMPTZ` | Default: `NOW()` | 수정 일시 |

---

### 2.2 Dogs & Context (반려견 정보)

#### `dogs`
반려견의 기본 프로필입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 반려견 고유 ID |
| `user_id` | `UUID` | **FK** (`users.id`), On Delete: Cascade | 소유자 |
| `name` | `VARCHAR(255)` | Not Null | 이름 |
| `breed` | `VARCHAR(255)` | | 견종 |
| `birth_date` | `DATE` | | 생년월일 |
| `sex` | `dog_sex` | | 성별 |
| `profile_image_url` | `TEXT` | | 프로필 이미지 URL |
| `anonymous_sid` | `VARCHAR(255)` | | 게스트용 임시 식별자 |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |
| `updated_at` | `TIMESTAMPTZ` | Default: `NOW()` | 수정 일시 |

#### `dog_env`
반려견의 환경 및 건강 등 상세 메타데이터입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 환경 정보 ID |
| `dog_id` | `UUID` | **FK** (`dogs.id`), Unique, On Delete: Cascade | 해당 반려견 |
| `household_info` | `JSONB` | | 주거 형태, 가족 구성, 주 양육자 |
| `health_meta` | `JSONB` | | 기저 질환, 알레르기 |
| `profile_meta` | `JSONB` | | 몸무게, 입양일 |
| `rewards_meta` | `JSONB` | | 좋아하는 간식, 보상 유형 |
| `chronic_issues` | `JSONB` | | 주요 문제 행동 (Top 3) |
| `antecedents` | `JSONB` | | 문제 행동 발생 상황 (ABC - A) |
| `triggers` | `JSONB` | | 문제 행동 유발 트리거 (Specific) |
| `past_attempts` | `JSONB` | | 실패했던 대처법 (ABC - C) |
| `temperament` | `JSONB` | | 기질 및 민감도 (5점 척도) |
| `activity_meta` | `JSONB` | | 산책, 놀이, 활동 정보 |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |
| `updated_at` | `TIMESTAMPTZ` | Default: `NOW()` | 수정 일시 |

---

### 2.3 Activity & Logs (행동 기록)

#### `behavior_logs`
ABC(선행사건-행동-결과) 기반의 행동 로그입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 로그 ID |
| `dog_id` | `UUID` | **FK** (`dogs.id`), On Delete: Cascade | 대상 반려견 |
| `is_quick_log` | `BOOLEAN` | Default: `FALSE` | 퀵 버튼 기록 여부 |
| `type_id` | `INTEGER` | | 문제 행동 유형 ID (마스터 코드) |
| `antecedent` | `TEXT` | | 선행 사건 (A) |
| `behavior` | `TEXT` | | 구체적 행동 (B) |
| `consequence` | `TEXT` | | 보호자 반응/결과 (C) |
| `intensity` | `INTEGER` | Check: `1 <= intensity <= 10` | 심각도/강도 |
| `duration` | `INTEGER` | | 지속 시간 (초 단위) |
| `occurred_at` | `TIMESTAMPTZ` | Default: `NOW()` | 실제 발생 시각 |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |
| `updated_at` | `TIMESTAMPTZ` | Default: `NOW()` | 수정 일시 |

#### `media_assets`
로그에 첨부된 미디어 파일입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 미디어 ID |
| `log_id` | `UUID` | **FK** (`behavior_logs.id`), On Delete: Set Null | 연결된 로그 |
| `storage_url` | `TEXT` | Not Null | 파일 저장 경로 (S3 등) |
| `asset_type` | `asset_type` | Not Null | 파일 유형 (사진/영상) |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |

---

### 2.4 AI Coaching (AI 분석 및 코칭)

#### `ai_coaching`
AI가 분석한 리포트 결과입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 코칭 ID |
| `dog_id` | `UUID` | **FK** (`dogs.id`), On Delete: Cascade | 대상 반려견 |
| `report_type` | `report_type` | Not Null | 리포트 유형 (일간/주간/통찰) |
| `analysis_json` | `JSONB` | | 분석 결과 (원인, 조언 등) |
| `action_items` | `JSONB` | | 추천 행동 (To-Do) 목록 |
| `feedback_score` | `INTEGER` | Check: `1 <= score <= 5` | 유저 피드백 점수 (1~5) |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |

#### `action_tracker`
코칭에서 제안된 할 일의 실천 여부입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 추적 ID |
| `coaching_id` | `UUID` | **FK** (`ai_coaching.id`), On Delete: Cascade | 관련 코칭 리포트 |
| `is_completed` | `BOOLEAN` | Default: `FALSE` | 실천 완료 여부 |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |
| `updated_at` | `TIMESTAMPTZ` | Default: `NOW()` | 수정 일시 |

---

### 2.5 Engagement (알림 및 시스템)

#### `noti_history`
알림 발송 이력입니다.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 알림 ID |
| `user_id` | `UUID` | **FK** (`users.id`), On Delete: Cascade | 수신자 |
| `channel` | `noti_channel` | Not Null | 발송 채널 |
| `template_code` | `VARCHAR(100)` | | 알림톡 템플릿 코드 |
| `sent_at` | `TIMESTAMPTZ` | Default: `NOW()` | 발송 시각 |
| `read_at` | `TIMESTAMPTZ` | | 확인(읽음) 시각 |

#### `log_summaries`
AI 비용 최적화(RAG)를 위한 행동 로그 요약본입니다. (Plan Phase 4)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PK**, Default: `uuid_generate_v4()` | 요약 ID |
| `dog_id` | `UUID` | **FK** (`dogs.id`), On Delete: Cascade | 대상 반려견 |
| `start_date` | `DATE` | Not Null | 요약 구간 시작 |
| `end_date` | `DATE` | Not Null | 요약 구간 종료 |
| `summary_text` | `TEXT` | Not Null | 요약 내용 |
| `embedding` | `VECTOR(1536)` | | RAG 검색용 벡터 데이터 |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | 생성 일시 |

---

## 3. Security (RLS Policies)
모든 테이블은 RLS(Row Level Security)가 활성화되어야 하며, 기본적으로 `auth.uid()`를 기반으로 접근을 제어합니다.

| Table | Policy | Action | Condition |
| :--- | :--- | :--- | :--- |
| `users` | `Users can view own profile` | SELECT | `auth.uid() = id` |
| `users` | `Users can update own profile` | UPDATE | `auth.uid() = id` |
| `dogs` | `Users can view own dogs` | SELECT | `auth.uid() = user_id` |
| `dogs` | `Users can insert own dogs` | INSERT | `auth.uid() = user_id` |
| `behavior_logs` | `Users can view logs of own dogs` | SELECT | `dog_id IN (SELECT id FROM dogs WHERE user_id = auth.uid())` |

