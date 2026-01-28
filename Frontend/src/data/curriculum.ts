import { LucideIcon, Home, Shield, Music, Dog, Eye, Footprints, Flag, Lock, Check, Zap, Sparkles, Trash2, MapPin, Users, HeartHandshake, CloudRain, Sun, Wind, Umbrella, Anchor } from "lucide-react";

export interface TrainingStep {
    step_number: number;
    title: string;
    description: string;
    success_criteria: string;
}

export interface TrainingStage {
    id: string;
    day: number;
    title: string;
    goal: string;
    icon: LucideIcon;
    steps: TrainingStep[];
}

export interface TrainingCourse {
    id: string;
    title: string;
    description: string;
    total_days: number;
    difficulty: "Easy" | "Medium" | "Hard";
    stages: TrainingStage[];
}

export const TRAINING_CURRICULUM: TrainingCourse[] = [
    {
        id: "separation_anxiety",
        title: "[나 홀로 집에] 씩씩한 독립심 클래스",
        description: "혼자 있는 시간이 두려움이 아닌 휴식이 됩니다. 스스로를 믿는 힘을 키워주세요.",
        total_days: 5,
        difficulty: "Medium",
        stages: [
            {
                id: "sep_1",
                day: 1,
                title: "눈치 채지 못하게! 외출 예습",
                goal: "보호자의 외출 준비 신호를 일상적인 소음으로 받아들이게 합니다.",
                icon: Home,
                steps: [
                    {
                        step_number: 1,
                        title: "외출복 입고 소파에서 TV 보기",
                        description: "외출복을 입은 채로 바로 나가지 말고 5~10분간 평소처럼 행동하세요.",
                        success_criteria: "옷 갈아입는 소리에도 따라오지 않고 30초 이상 차분히 대기"
                    },
                    {
                        step_number: 2,
                        title: "가방 챙기는 소리 '배경음악' 만들기",
                        description: "가방을 들었다 놓았다 하며 자극에 무뎌지게 하세요.",
                        success_criteria: "소지품 소음에 반응하지 않고 제자리에서 엉덩이를 붙이고 유지"
                    },
                    {
                        step_number: 3,
                        title: "현관 다녀오기 (빈 손 복귀)",
                        description: "신발을 신고 현관까지 걸어갔다 아무 일 없듯 돌아오세요.",
                        success_criteria: "현관 접근에도 흥분하지 않고 30초 이상 제자리에서 기다림"
                    }
                ]
            },
            {
                id: "sep_2",
                day: 2,
                title: "문 너머 세상과 '안녕' 하는 법",
                goal: "현관문이 닫히는 소리를 '금방 돌아온다'는 약속의 신호로 바꿉니다.",
                icon: Shield,
                steps: [
                    {
                        step_number: 1,
                        title: "문고리 소리 들려주기",
                        description: "문고리를 잡고 소리를 내되, 문은 열지 않고 강아지의 시선을 분산하세요.",
                        success_criteria: "문고리 소리 후 10초간 짖거나 현관으로 돌진하지 않음"
                    },
                    {
                        step_number: 2,
                        title: "3초간의 아주 짧은 작별",
                        description: "아주 잠깐 문 뒤로 사라졌다 나타나는 패턴을 반복하세요.",
                        success_criteria: "보호자가 들어올 때 점프하지 않고 네 발을 바닥에 붙인 채 맞이함"
                    },
                    {
                        step_number: 3,
                        title: "1분간의 혼자 있는 연습",
                        description: "부재 시간을 조금씩 늘려 1분간 문 밖에서 조용히 기다려 봅니다.",
                        success_criteria: "1분 동안 짖거나 문을 긁지 않고 차분히 기다리는 상태"
                    }
                ]
            },
            {
                id: "sep_3",
                day: 3,
                title: "코끝으로 만나는 즐거운 몰입",
                goal: "혼자 있는 시간을 지루함이 아닌 집중력 있는 놀이 시간으로 전환합니다.",
                icon: Music,
                steps: [
                    {
                        step_number: 1,
                        title: "수건 속에 숨겨진 보물 찾기",
                        description: "간식을 넣은 수건을 가볍게 묶어 흥미를 유발하세요.",
                        success_criteria: "30초 이상 킁킁거리며 간식 찾기에만 집중"
                    },
                    {
                        step_number: 2,
                        title: "단단한 매듭 풀기 챌린지",
                        description: "수건 매듭을 좀 더 촘촘히 묶어 해결하는 재미를 줍니다.",
                        success_criteria: "60초 이상 포기하지 않고 냄새 맡기와 풀기에 집중"
                    },
                    {
                        step_number: 3,
                        title: "박스 노즈워크 완결판",
                        description: "종이 박스에 간식을 넣어 밀봉한 뒤 뜯어보게 하세요.",
                        success_criteria: "2분 이상 집중하여 박스를 탐색하며 불안감 해소"
                    }
                ]
            },
            {
                id: "sep_4",
                day: 4,
                title: "보호자가 안 보여도 괜찮아요",
                goal: "시야에서 사라져도 '우린 곧 만날 것'이라는 확신을 심어줍니다.",
                icon: Dog,
                steps: [
                    {
                        step_number: 1,
                        title: "방석 위에서 1:1 대기",
                        description: "방석에서 기다리는 시간을 조금씩 늘리며 차분할 때 보상하세요.",
                        success_criteria: "10초 이상 방석에서 이탈하지 않고 편안히 대기"
                    },
                    {
                        step_number: 2,
                        title: "문턱 너머에서 지켜보기",
                        description: "보호자가 다른 방으로 이동해도 따라오지 않게 유도하세요.",
                        success_criteria: "보호자 이동 시 10초 이상 제자리에서 얌전히 지켜봄"
                    },
                    {
                        step_number: 3,
                        title: "문을 닫고 안심 시키기",
                        description: "방 문을 닫고 시야를 완전히 차단한 상태에서 대기해 봅니다.",
                        success_criteria: "시야 차단 후에도 10초 이상 낑낑거림 없이 평온 유지"
                    }
                ]
            },
            {
                id: "sep_5",
                day: 5,
                title: "쿨한 이별과 뜨거운 재회 매너",
                goal: "나갈 때와 들어올 때의 감정 기복을 조절하여 평안한 일상을 만듭니다.",
                icon: Eye,
                steps: [
                    {
                        step_number: 1,
                        title: "외출 10분 전 '무관심' 연습",
                        description: "외출 직전에는 과도한 흥분이나 집착을 방지하기 위해 평온을 유지하세요.",
                        success_criteria: "외출 준비 중 조르기 없이 스스로 쉬는 모습 포착"
                    },
                    {
                        step_number: 2,
                        title: "귀가 후 '30초의 진정'",
                        description: "집에 오면 즉시 인사하지 말고 강아지가 차분해질 때까지 아는 체하지 마세요.",
                        success_criteria: "귀가 후 30초 내에 흥분을 가라앉히고 차분히 서 있는 상태"
                    },
                    {
                        step_number: 3,
                        title: "차분한 네 발에 보상하기",
                        description: "흥분이 가라앉고 네 발이 바닥에 고정되었을 때 부드럽게 쓰다듬어 주세요.",
                        success_criteria: "귀가 후 5초 이상 점프 없이 조용히 보호자를 맞이함"
                    }
                ]
            }
        ]
    },
    {
        id: "barking_noise",
        title: "[세상 밖 소리] 마음 근육 튼튼 프로젝트",
        description: "외부 소음에 예민한 아이를 위한 둔감화 및 긍정 전환 가이드",
        total_days: 5,
        difficulty: "Hard",
        stages: [
            {
                id: "bark_1",
                day: 1,
                title: "우리 집을 '세이프 존'으로",
                goal: "자극이 들어오는 경로를 물리적/청각적으로 보완하여 짖음 빈도를 낮춥니다.",
                icon: Lock,
                steps: [
                    {
                        step_number: 1,
                        title: "백색소음으로 소음 가리기",
                        description: "정적 속에 들리는 복도 소리는 더 크게 느껴집니다. TV나 라디오를 활용하세요.",
                        success_criteria: "외부 소리가 들려도 10초 내에 짖음을 멈추거나 반응 무시"
                    },
                    {
                        step_number: 2,
                        title: "현관 돌진 방지벽 만들기",
                        description: "현관이나 창가로 즉각 달려가지 못하게 공간을 분리해 주세요.",
                        success_criteria: "자극 지점으로의 무조건적인 돌진이 물리적으로 제어됨"
                    },
                    {
                        step_number: 3,
                        title: "스스로 포기할 때 지지하기",
                        description: "짖다가 스스로 멈추고 돌아오는 찰나를 놓치지 마세요.",
                        success_criteria: "5초 내로 상황을 살피다 스스로 돌아와 자리로 이동"
                    }
                ]
            },
            {
                id: "bark_2",
                day: 2,
                title: "소리가 나면? '내 본부'로 이동!",
                goal: "짖는 대신 안전한 매트로 돌아가는 긍정적 회피 루틴을 만듭니다.",
                icon: Flag,
                steps: [
                    {
                        step_number: 1,
                        title: "매트로 즐겁게 체크인",
                        description: "강아지를 매트로 부르고 그곳이 기분 좋은 공간임을 알려주세요.",
                        success_criteria: "신호에 맞춰 3초 내로 매트에 올라가 자리를 잡음"
                    },
                    {
                        step_number: 2,
                        title: "소리 들리자마자 '자리로' 명령",
                        description: "작은 외부음이 들리는 즉시 매트로 가는 신호를 주세요.",
                        success_criteria: "소음을 들은 직후 3초 내로 매트로 이동하여 대기"
                    },
                    {
                        step_number: 3,
                        title: "매트에서 누리는 평화",
                        description: "매트 위에서 머무는 시간을 늘려 소음이 지나가길 기다리게 하세요.",
                        success_criteria: "매트 위에서 30초 이상 이탈 없이 엎드려 대기 유지"
                    }
                ]
            },
            {
                id: "bark_3",
                day: 3,
                title: "흥분 대신 보호자랑 '아이컨택'",
                goal: "짖음 본능이 폭발하기 전 보호자에게 집중해 행동을 전환합니다.",
                icon: Sparkles,
                steps: [
                    {
                        step_number: 1,
                        title: "이름 한 번에 주의 환기",
                        description: "짖으려는 찰나에 이름을 불러 집중력을 나에게 가져오세요.",
                        success_criteria: "이름을 부르면 2초 내 짖음을 멈추고 보호자를 응시함"
                    },
                    {
                        step_number: 2,
                        title: "손바닥 가이드 터치",
                        description: "손바닥에 코를 대는 동작으로 짖으려는 신체 리듬을 끊어주세요.",
                        success_criteria: "손바닥 신호에 3초 내 코를 대며 행동 전환 성공"
                    },
                    {
                        step_number: 3,
                        title: "성공적인 감정 조절 보상",
                        description: "집중을 돌린 뒤 조용해지면 즉시 부드럽게 칭찬하세요.",
                        success_criteria: "행동 전환 후 10초 이상 추가 짖음 없이 평온 유지"
                    }
                ]
            },
            {
                id: "bark_4",
                day: 4,
                title: "목소리보다 강한 '코'의 힘",
                goal: "공격적인 짖음의 에너지를 후각 탐색(노즈워크)으로 빠르게 전환합니다.",
                icon: Footprints,
                steps: [
                    {
                        step_number: 1,
                        title: "소음을 탐색 신호로 재정의",
                        description: "작은 소리가 들리면 바로 '맛있는 거 찾아봐!'라고 즐겁게 말하세요.",
                        success_criteria: "신호와 동시에 바닥을 훑으며 간식을 찾기 시작"
                    },
                    {
                        step_number: 2,
                        title: "바닥에 주어지는 10알의 기쁨",
                        description: "간식을 흩뿌려 바닥 냄새 맡기에 열중하게 유도하세요.",
                        success_criteria: "간식을 찾는 동안 짖음을 잊고 탐색 행위에 몰입함"
                    },
                    {
                        step_number: 3,
                        title: "탐색 끝, 진정 시작",
                        description: "간식을 다 찾은 뒤 스스로 진정하며 제자리에 복귀하게 하세요.",
                        success_criteria: "30초 이상 집중 탐색을 이어가며 짖음 시도가 발생하지 않음"
                    }
                ]
            },
            {
                id: "bark_5",
                day: 5,
                title: "소리가 들리면 좋은 일이 생겨요",
                goal: "소음을 무서운 침입자가 아닌, 기분 좋은 선물(보상)의 신호로 인식합니다.",
                icon: Music,
                steps: [
                    {
                        step_number: 1,
                        title: "소리 뒤에 숨겨진 보상",
                        description: "의도적인 소음을 내고 직후에 조용히 대기하면 정답임을 알려주세요.",
                        success_criteria: "소리 발생 후 2초간 침묵 상태에서 보상을 기다림"
                    },
                    {
                        step_number: 2,
                        title: "소음 둔감화 마스터",
                        description: "자극에 무덤덤하거나 보호자를 쳐다볼 때 큰 보상을 주세요.",
                        success_criteria: "소리가 나도 짖는 대신 보호자 쪽을 보며 기대를 표현함"
                    },
                    {
                        step_number: 3,
                        title: "평온함이 일상이 되는 훈련",
                        description: "소리가 멈추면 보상도 멈춰, '소리=간식' 공식을 마음에 새기게 하세요.",
                        success_criteria: "자극 발생 후에도 흥분이 빠르게 내려가고 일상으로 복귀함"
                    }
                ]
            }
        ]
    },
    {
        id: "toilet_training",
        title: "[클린 화장실] 우리 아이 화장실 가이드",
        description: "좌절 없는 배변 교육! 정확한 공간 인지와 환경 설정의 비결",
        total_days: 5,
        difficulty: "Easy",
        stages: [
            {
                id: "toilet_1",
                day: 1,
                title: "실수 장소를 행복 공간으로",
                goal: "과거 실수했던 장소의 냄새를 지우고 생활 구역으로 인식시킵니다.",
                icon: Trash2,
                steps: [
                    {
                        step_number: 1,
                        title: "냄새 제로! 효소 세정제 세척",
                        description: "일반 세제보다 강력한 반려동물 전용 세정제로 흔적을 지워주세요.",
                        success_criteria: "동일한 지점에서의 재실수가 48시간 내에 0회"
                    },
                    {
                        step_number: 2,
                        title: "그곳에서 즐기는 식사 시간",
                        description: "실수하던 자리에 밥그릇을 두어 '볼일 보는 곳'이 아님을 알려주세요.",
                        success_criteria: "해당 구역에서 배변 자세를 잡으려는 시도가 0회"
                    },
                    {
                        step_number: 3,
                        title: "놀이로 채워지는 긍정 공간",
                        description: "그 장소에서 가족과 함께 신나게 놀아주며 거실의 일부로 만드세요.",
                        success_criteria: "해당 구역에서 일주일 연속 실수 없이 생활 구역으로 안착"
                    }
                ]
            },
            {
                id: "toilet_2",
                day: 2,
                title: "골든타임을 잡아라! 유도 훈련",
                goal: "배변 신호가 올 때 자연스럽게 지정 장소로 이동하도록 돕습니다.",
                icon: MapPin,
                steps: [
                    {
                        step_number: 1,
                        title: "식후 즉시 화장실 에스코트",
                        description: "밥을 먹은 뒤 배변 신호가 보이면 지체 없이 화장실로 데려가세요.",
                        success_criteria: "식후 신호가 올 때 1분 내로 지정 공간으로 유도 성공"
                    },
                    {
                        step_number: 2,
                        title: "성공의 기쁨, 즉각 보상",
                        description: "지정 장소에서 성공하는 순간, 세상에서 가장 큰 칭찬을 해주세요.",
                        success_criteria: "지정 장소에서 3회 연속 배변 성공"
                    },
                    {
                        step_number: 3,
                        title: "성공 뒤에 찾아오는 자유",
                        description: "정확한 곳에 배변했다면 마음껏 뛰어놀 수 있는 보상을 주세요.",
                        success_criteria: "배변 후 스스로 지정 장소를 빠져나와 칭찬을 기다림"
                    }
                ]
            },
            {
                id: "toilet_3",
                day: 3,
                title: "발끝으로 느끼는 패드 촉감",
                goal: "발바닥에 닿는 패드의 느낌을 배변의 신호로 기억하게 합니다.",
                icon: Footprints,
                steps: [
                    {
                        step_number: 1,
                        title: "러그는 당분간 안녕",
                        description: "패드와 헷갈릴 수 있는 푹신한 카펫이나 발매트는 잠시 치워주세요.",
                        success_criteria: "배변 전 맴돌기 행동 후 패드 위에서만 멈춰 자세 조정"
                    },
                    {
                        step_number: 2,
                        title: "맨바닥은 '노는 곳' 공식",
                        description: "딱딱한 맨바닥에서 식사와 놀이를 진행해 배변 금지 구역임을 각인하세요.",
                        success_criteria: "맨바닥에서 배변 자세를 시도하는 횟수가 24시간 내 0회"
                    },
                    {
                        step_number: 3,
                        title: "네 발의 착지 확인",
                        description: "앞발만 걸치는 게 아니라 네 발이 모두 패드 위에 올라오게 유도하세요.",
                        success_criteria: "네 발이 모두 패드에 올라온 정자세로 3회 연속 성공"
                    }
                ]
            },
            {
                id: "toilet_4",
                day: 4,
                title: "코가 알려주는 화장실 위치",
                goal: "새 패드에서도 냄새를 통해 자기 화장실을 빠르게 찾게 합니다.",
                icon: Wind,
                steps: [
                    {
                        step_number: 1,
                        title: "냄새 가이드 활용하기",
                        description: "새 패드에 기존 소변을 아주 살짝 묻혀 익숙한 향을 내주세요.",
                        success_criteria: "새 패드 교체 후 1분 내로 냄새를 맡으며 위치 확인"
                    },
                    {
                        step_number: 2,
                        title: "스스로 찾아가는 코 훈련",
                        description: "보호자의 유도 없이 냄새를 보고 스스로 올라가는지 지켜보세요.",
                        success_criteria: "배변 신호 시 패드로 직행하여 배변 3회 연속 성공"
                    },
                    {
                        step_number: 3,
                        title: "무취 패드 완벽 적응",
                        description: "이제 냄새 가이드 없이 깨끗한 새 패드만 깔아두고 성공을 지켜보세요.",
                        success_criteria: "완전 새 패드에서도 스스로 찾아가 배변 3회 연속 수행"
                    }
                ]
            },
            {
                id: "toilet_5",
                day: 5,
                title: "화장실 영토 최적화",
                goal: "넓게 깔아둔 패드 범위를 점진적으로 줄여 정확한 타겟을 잡습니다.",
                icon: Flag,
                steps: [
                    {
                        step_number: 1,
                        title: "넉넉한 패드 5장부터 시작",
                        description: "처음에는 넓게 깔아주어 실수할 확률을 물리적으로 줄여주세요.",
                        success_criteria: "패드 5장 범위 안에서 실수 없이 3회 연속 성공"
                    },
                    {
                        step_number: 2,
                        title: "한 장씩 줄여나가는 고수준 훈련",
                        description: "성공률이 높아지면 가장자리 패드부터 한 장씩 조심스레 치워주세요.",
                        success_criteria: "패드 장수를 줄여도 10회 중 9회 이상 정확히 성공"
                    },
                    {
                        step_number: 3,
                        title: "1장의 정체성 완성",
                        description: "마지막 패드 1장 위에서 완벽히 성공하는 아이의 모습을 응원해 주세요.",
                        success_criteria: "패드 1장만 남은 상태에서 일주일간 실수 0회 (졸업)"
                    }
                ]
            }
        ]
    },
    {
        id: "pica_correction",
        title: "[맛있는 유혹] 올바른 식습관 교정",
        description: "이물질 섭취와 식분증은 생명과 직결됩니다. 안전한 입매무새를 위한 긴급 솔루션!",
        total_days: 5,
        difficulty: "Hard",
        stages: [
            {
                id: "pica_1",
                day: 1,
                title: "발견 즉시 '여기로!' 리콜",
                goal: "이물질을 입에 담기 전, 보호자에게 달려오는 습관을 만듭니다.",
                icon: Trash2,
                steps: [
                    {
                        step_number: 1,
                        title: "호기심 대상 발견 시 즉시 부르기",
                        description: "무언가 발견하면 즉시 흥분을 낮추는 톤으로 보호자에게 불러주세요.",
                        success_criteria: "대상 발견 후 2초 내 보호자를 쳐다보거나 1m 내로 복귀"
                    },
                    {
                        step_number: 2,
                        title: "보호자가 든든한 방패 되기",
                        description: "강아지가 다가가지 못하게 몸으로 정면을 막아서며 거리를 두세요.",
                        success_criteria: "대상과 1m 이상 거리가 유지되고 재접근 시도가 없음"
                    },
                    {
                        step_number: 3,
                        title: "몰래 치우기 (보호자 통제)",
                        description: "강아지가 보지 않는 틈을 타 안전하게 대상을 회수하세요.",
                        success_criteria: "보호자가 대상을 수거하는 동안 접근/섭취 시도가 0회"
                    }
                ]
            },
            {
                id: "pica_2",
                day: 2,
                title: "나쁜 것은 '거절'하는 멋진 태도",
                goal: "이물질을 보아도 입을 대는 대신 보호자에게 '어떻게 할까?' 물어보게 합니다.",
                icon: Sparkles,
                steps: [
                    {
                        step_number: 1,
                        title: "관찰 시 주의 환기 신호",
                        description: "이물질에 코를 대려 할 때 짧고 명확한 신호로 주의를 돌리세요.",
                        success_criteria: "신호 후 2초 내 대상 쪽 접근이 멈추고 보호자 쪽으로 전환"
                    },
                    {
                        step_number: 2,
                        title: "나를 보면 쏟아지는 보상",
                        description: "유혹을 이기고 보호자를 쳐다보면 세상에서 가장 맛있는 간식을 주세요.",
                        success_criteria: "대상 대신 보호자 쪽으로 고개를 돌리는 행동 3회 연속"
                    },
                    {
                        step_number: 3,
                        title: "한 걸음 뒤로 물러나기",
                        description: "스스로 대상과 거리를 벌리는 용기를 보낼 때까지 기다려 주세요.",
                        success_criteria: "대상을 보면 스스로 1m 이상 뒤로 물러남 3회 연속"
                    }
                ]
            },
            {
                id: "pica_3",
                day: 3,
                title: "세상에서 가장 공정한 교환 게임",
                goal: "입에 문 물건을 뺏기지 않으려 도망가는 대신, 자발적으로 내놓게 합니다.",
                icon: HeartHandshake,
                steps: [
                    {
                        step_number: 1,
                        title: "입에 문 물건 존중하기",
                        description: "물고 있어도 억지로 뺏지 말고 간식을 보여주며 관심을 유도하세요.",
                        success_criteria: "보호자가 다가가도 도망가거나 으르렁거리지 않음"
                    },
                    {
                        step_number: 2,
                        title: "'주세요' 신호와 잭팟 교환",
                        description: "입에 있는 것보다 훨씬 매력적인 간식을 보여주며 교환하세요.",
                        success_criteria: "간식을 보면 스스로 입을 벌려 물건을 툭 떨어뜨림"
                    },
                    {
                        step_number: 3,
                        title: "교환 후의 추가 선물",
                        description: "물건을 회수한 뒤에도 보상을 이어가 '뺏겼다'는 상실감을 없애주세요.",
                        success_criteria: "물건 수거 후에도 찾지 않고 보호자에게 다음 보상을 기대함"
                    }
                ]
            },
            {
                id: "pica_4",
                day: 4,
                title: "안전하게 씹고 맛보는 즐거움",
                goal: "부족한 씹기 욕구를 안전한 장난감(KONG 등)으로 건강하게 해소합니다.",
                icon: Dog,
                steps: [
                    {
                        step_number: 1,
                        title: "꽁꽁 얼린 정답 장난감",
                        description: "고무 장난감 안에 좋아하는 음식을 채워 얼려서 제공하세요.",
                        success_criteria: "장난감을 받자마자 자신의 아지트(방석/집)로 가져가 집중함"
                    },
                    {
                        step_number: 2,
                        title: "스트레스 제로! 핥아먹기",
                        description: "핥고 씹는 행위는 뇌의 이완을 돕습니다. 맘껏 즐기게 해주세요.",
                        success_criteria: "핥고 씹는 행동이 10분 이상 지속되며 과흥분 없이 유지"
                    },
                    {
                        step_number: 3,
                        title: "마무리는 깔끔하게 회수",
                        description: "내용물을 다 먹으면 조용히 다가가 간식과 교환하며 수거하세요.",
                        success_criteria: "다 먹은 장난감을 보호자가 가져가도 지키려 하지 않음"
                    }
                ]
            },
            {
                id: "pica_5",
                day: 5,
                title: "위험한 건 무시, 놀이로 해소",
                goal: "파괴 본능은 종이 놀이로 풀고, 전선 등 위험물은 스스로 기피하게 합니다.",
                icon: Flag,
                steps: [
                    {
                        step_number: 1,
                        title: "맘껏 찢고 뜯는 종이 보물 상자",
                        description: "신문지나 종이 박스에 간식을 숨겨 마음껏 찢게 해주세요.",
                        success_criteria: "종이를 찢으며 즐거워하되, 종이 자체를 먹지는 않음"
                    },
                    {
                        step_number: 2,
                        title: "잔해물 정리 수업",
                        description: "놀이가 끝난 뒤 종이 조각을 주울 때 보상을 주어 수거를 도우세요.",
                        success_criteria: "남은 부스러기를 먹으려 하지 않고 보호자에게 양보"
                    },
                    {
                        step_number: 3,
                        title: "기피제 가이드 도포",
                        description: "물면 안 되는 전선 등에는 쓴맛 기피제를 발라 학습을 돕습니다.",
                        success_criteria: "해당 물건 근처에 가도 핥기/씹기 시도 없이 스스로 돌아섬"
                    }
                ]
            }
        ]
    },
    {
        id: "leash_walking",
        title: "[발맞춰 걷기] 매너 있는 산책의 즐거움",
        description: "줄 당김 없는 평화로운 산책! 리드줄은 속박이 아닌 소통의 끈입니다.",
        total_days: 6,
        difficulty: "Medium",
        stages: [
            {
                id: "walk_1",
                day: 1,
                title: "집에서 배우는 '리드줄' 매너",
                goal: "흥분이 가라앉은 익숙한 실내에서 줄에 대한 긴장감을 먼저 낮춥니다.",
                icon: Home,
                steps: [
                    {
                        step_number: 1,
                        title: "집 안에서 줄 매고 산책 기분 내기",
                        description: "거실에서 줄을 매고 천천히 걸어가며 자연스럽게 받아들이게 하세요.",
                        success_criteria: "리드줄 착용 후 30초 이내에 과도한 흥분 없이 걸음"
                    },
                    {
                        step_number: 2,
                        title: "옆자리 '체크인' 보상",
                        description: "보호자 옆에 바짝 붙어 걸을 때마다 아낌없이 칭찬해 주세요.",
                        success_criteria: "걷는 중간 중간 자발적으로 보호자 곁으로 다가옴"
                    },
                    {
                        step_number: 3,
                        title: "느슨한 줄 유지하기 (J-Line)",
                        description: "줄이 팽팽해지지 않도록 속도를 맞추며 간격을 유지하세요.",
                        success_criteria: "리드줄이 U자나 J자로 느슨하게 유지되는 시간이 10초 이상"
                    }
                ]
            },
            {
                id: "walk_2",
                day: 2,
                title: "나를 봐요! 아이컨택 챌린지",
                goal: "주변 자극보다 보호자의 움직임과 표정에 집중하는 습관을 들입니다.",
                icon: Eye,
                steps: [
                    {
                        step_number: 1,
                        title: "이름 부르면 미소 지어주기",
                        description: "산책 중 수시로 이름을 불러 보호자의 존재를 각인시키세요.",
                        success_criteria: "이름을 부르면 2초 이내에 고개를 돌려 눈을 맞춤"
                    },
                    {
                        step_number: 2,
                        title: "눈 마주치면 터져 나오는 보상",
                        description: "의도하지 않아도 나를 쳐다볼 때마다 즉시 간식과 칭찬을 줍니다.",
                        success_criteria: "1분 안에 2회 이상 스스로 보호자를 쳐다봄"
                    },
                    {
                        step_number: 3,
                        title: "소음 속에서도 나에게 집중",
                        description: "작은 외부 소리에도 짖지 않고 보호자를 보면 더 큰 보상을 주세요.",
                        success_criteria: "약한 자극 속에서도 보호자에게 시선을 두려 노력함"
                    }
                ]
            },
            {
                id: "walk_3",
                day: 3,
                title: "멈추면 얻는 전진의 기회",
                goal: "줄을 당기면 멈춘다는 것을 학습해, 스스로 속도를 조절하게 합니다.",
                icon: Anchor,
                steps: [
                    {
                        step_number: 1,
                        title: "나무처럼 그대로 멈추기",
                        description: "강아지가 줄을 팽팽하게 당기면 한 걸음도 가지 말고 멈추세요.",
                        success_criteria: "당김이 느껴지자마자 일관되게 정지 상태 유지"
                    },
                    {
                        step_number: 2,
                        title: "줄이 풀리면 다시 출발!",
                        description: "강아지가 줄을 헐겁게 하면 '가자' 소리와 함께 전진하세요.",
                        success_criteria: "텐션이 풀린 뒤 출발 신호에 맞춰 다시 걷기 시작"
                    },
                    {
                        step_number: 3,
                        title: "인내심 보상하기",
                        description: "당기는 흐름이 끊기고 나를 기다려줄 때 풍부한 보상을 줍니다.",
                        success_criteria: "당김-정지-완화-전진의 루틴이 3회 연속 매끄럽게 진행"
                    }
                ]
            },
            {
                id: "walk_4",
                day: 4,
                title: "방향 전환으로 집중력 Up",
                goal: "앞서가려는 강아지보다 보호자가 산책의 '리더'임을 명확히 합니다.",
                icon: Footprints,
                steps: [
                    {
                        step_number: 1,
                        title: "질주 본능 차단하기",
                        description: "앞으로 튀어나가려 하면 아무 말 없이 반대 방향으로 몸을 트세요.",
                        success_criteria: "보호자가 돌면 강아지도 2초 내에 속도를 줄이며 돌아봄"
                    },
                    {
                        step_number: 2,
                        title: "180도 회전 시각화",
                        description: "강아지와 반대 방향으로 리드미컬하게 걸어 집중을 유도하세요.",
                        success_criteria: "U턴 후에도 3초 이내에 보호자 뒤꽁무니를 따라옴"
                    },
                    {
                        step_number: 3,
                        title: "나란히 걷는 즐거움",
                        description: "방향 전환 후 다시 옆에 붙어 5초 이상 걸으면 칭찬해 줍니다.",
                        success_criteria: "방향 전환 후 보호자 근처에서 보폭을 맞추려 노력함"
                    }
                ]
            },
            {
                id: "walk_5",
                day: 5,
                title: "친구(다른 개) 매너 거리 찾기",
                goal: "자극 대상을 보아도 흥분하지 않고 안전한 거리를 유지하며 지나갑니다.",
                icon: Shield,
                steps: [
                    {
                        step_number: 1,
                        title: "안전 지대에서 관망하기",
                        description: "다른 개나 사람이 보이면 충분히 먼 거리에서 멈춰 지켜보세요.",
                        success_criteria: "자극을 발견해도 3초 이상 차분히 서서 기다릴 수 있음"
                    },
                    {
                        step_number: 2,
                        title: "구경만 해도 보상 팡팡!",
                        description: "짖거나 덤비지 않고 가만히 보고만 있을 때 간식을 주세요.",
                        success_criteria: "자극 확인 후 2초 내에 보호자에게 시선을 돌리고 전환"
                    },
                    {
                        step_number: 3,
                        title: "천천히 아주 조금씩 접근",
                        description: "자극이 있는 쪽으로 한 걸음씩 가되, 흥분하면 다시 뒤로 물러나세요.",
                        success_criteria: "거리를 조금 좁혀도 '대기 및 전환'이 똑같이 유지됨"
                    }
                ]
            },
            {
                id: "walk_6",
                day: 6,
                title: "자유 탐색과 매너 걷기의 조화",
                goal: "바르게 걷기에 대한 보상으로 충분한 냄새 맡기(노즈워크) 시간을 줍니다.",
                icon: Wind,
                steps: [
                    {
                        step_number: 1,
                        title: "미션! 20걸음 예쁘게 걷기",
                        description: "일정한 구간을 보호자 옆에서 완벽하게 걸어보세요.",
                        success_criteria: "리드줄이 일관되게 느슨한 상태로 20걸음 이상 이동"
                    },
                    {
                        step_number: 2,
                        title: "자유 탐색 권한 부여",
                        description: "열심히 걸은 보상으로 '가서 냄새 맡아!'라고 허락 신호를 주세요.",
                        success_criteria: "신호 후 정해진 시간 동안 마음껏 탐색하며 즐거워함"
                    },
                    {
                        step_number: 3,
                        title: "아쉬움 없는 복귀",
                        description: "탐색 시간이 끝나고 부르면 다시 산책 모드로 빠르게 전환하세요.",
                        success_criteria: "탐색 종료 신호 후 5초 이내에 다시 보호자 옆으로 복귀"
                    }
                ]
            }
        ]
    },
    {
        id: "multi_dog",
        title: "[우리는 깐부] 평화로운 다견 생활",
        description: "경쟁이 아닌 공존! 다견 가정을 위한 명확한 규칙과 배려 시스템",
        total_days: 5,
        difficulty: "Hard",
        stages: [
            {
                id: "multi_1",
                day: 1,
                title: "내 자리는 내가 지킨다!",
                goal: "각자의 전용 공간을 인식하여 불필요한 신체 접촉과 갈등을 줄입니다.",
                icon: Home,
                steps: [
                    {
                        step_number: 1,
                        title: "각자의 아지트(방석) 마련",
                        description: "서로의 동선이 겹치지 않는 곳에 각자의 잠자리를 지정하세요.",
                        success_criteria: "각가 정해준 방석으로 3초 이내에 기쁘게 올라감"
                    },
                    {
                        step_number: 2,
                        title: "'각자 자리로!' 동시 신호",
                        description: "각자의 이름을 부르고 자리를 잡게 하는 연습을 반복하세요.",
                        success_criteria: "보호자의 지시에 엉뚱한 자리에 가지 않고 자기 자리 고수"
                    },
                    {
                        step_number: 3,
                        title: "편안한 독방 휴식",
                        description: "상대방이 옆에 있어도 자기 자리에서 엎드려 쉬도록 유도하세요.",
                        success_criteria: "자리 이탈 없이 30초 이상 차분하게 각자 쉬는 상태"
                    }
                ]
            },
            {
                id: "multi_2",
                day: 2,
                title: "순서가 있는 마법의 보상",
                goal: "상대방이 보상을 받을 때 끼어들지 않고 자기 차례를 기다리게 합니다.",
                icon: Users,
                steps: [
                    {
                        step_number: 1,
                        title: "정확하게 호명하고 보상하기",
                        description: "특정한 이름 뒤에만 간식이 나간다는 것을 명확히 인지시키세요.",
                        success_criteria: "A의 이름을 부를 때 B가 옆에서 침착하게 지켜봄"
                    },
                    {
                        step_number: 2,
                        title: "기다려준 아이에게 '잭팟'",
                        description: "자기 차례가 아닌데 잘 참아준 아이에게 더 큰 칭찬을 해보세요.",
                        success_criteria: "상대가 간식을 먹는 동안 질투나 방해 없이 제자리 대기"
                    },
                    {
                        step_number: 3,
                        title: "랜덤 순서도 OK!",
                        description: "예측할 수 없는 순서로 번갈아 가며 보상해 집중력을 높입니다.",
                        success_criteria: "순서가 섞여도 이름이 불린 아이만 움직이며 3회 연속 성공"
                    }
                ]
            },
            {
                id: "multi_3",
                day: 3,
                title: "장난감이 싸움의 씨앗이 안 되게",
                goal: "보호자의 자원(장난감/애정)을 두고 질투 섞인 경쟁을 차단합니다.",
                icon: HeartHandshake,
                steps: [
                    {
                        step_number: 1,
                        title: "1:1 집중 놀이 교대하기",
                        description: "한 아이와 격하게 놀 때 다른 아이는 매트에서 이를 보게 하세요.",
                        success_criteria: "놀이 중인 개에게 몸을 들이밀거나 방해하는 행동 0회"
                    },
                    {
                        step_number: 2,
                        title: "조용히 보는 것도 놀이다",
                        description: "다른 애가 노는 걸 보고만 있어도 보상이 생김을 알려주세요.",
                        success_criteria: "다른 아이의 놀이 시간 동안 10초 이상 안정적으로 유지"
                    },
                    {
                        step_number: 3,
                        title: "과열되면 즉시 타임아웃",
                        description: "아이들의 흥분이 너무 올라가면 즉시 놀이를 중단하고 진정시키세요.",
                        success_criteria: "중단 신호 시 즉시 각자 자리로 이동해 10초 내 진정"
                    }
                ]
            },
            {
                id: "multi_4",
                day: 4,
                title: "매너 있는 식사 예절",
                goal: "식사 중 압박감을 느끼지 않도록 거리를 확보하고 소유욕을 조절합니다.",
                icon: Shield,
                steps: [
                    {
                        step_number: 1,
                        title: "심리적/물리적 거리 확보",
                        description: "처음에는 밥그릇 사이를 아주 멀리 두어 서로를 신경 쓰지 않게 하세요.",
                        success_criteria: "상대방 그릇에 신경 끄고 자신의 밥에만 집중해 식사 완료"
                    },
                    {
                        step_number: 2,
                        title: "식사 후 '체킹' 금지",
                        description: "다 먹은 후 상대 그릇 주변을 서성이지 않게 보호자가 막아주세요.",
                        success_criteria: "식사 직후 상대 그릇 쪽으로 가지 않고 보호자에게 복귀"
                    },
                    {
                        step_number: 3,
                        title: "나란히 앉아 식회 기다리기",
                        description: "준비된 밥그릇을 앞에 두고 차례로 배식받는 연습을 합니다.",
                        success_criteria: "모든 밥그릇이 놓일 때까지 짖음이나 돌진 없이 대기"
                    }
                ]
            },
            {
                id: "multi_5",
                day: 5,
                title: "우리는 단짝! 동행 산책",
                goal: "나란히 걷기가 갈등이 아닌 소통의 시간이 되도록 리듬을 맞춥니다.",
                icon: Footprints,
                steps: [
                    {
                        step_number: 1,
                        title: "2m 간격의 안전 산책",
                        description: "서로 으르렁대지 않는 충분한 거리를 두고 앞뒤/좌우로 걸으세요.",
                        success_criteria: "상대방의 존재를 의식하면서도 편안한 발걸음 유지"
                    },
                    {
                        step_number: 2,
                        title: "동일한 방향으로 시선 맞추기",
                        description: "마주보고 걷는 대신 같은 풍경을 보며 나란히 걷는 시간을 늘립니다.",
                        success_criteria: "나란히 걷는 동안 20초 이상 으르렁거림이나 견제 없음"
                    },
                    {
                        step_number: 3,
                        title: "함께 노는 킁킁 타임",
                        description: "나란히 서서 각자의 지점에서 동시에 냄새 맡기를 보상으로 줍니다.",
                        success_criteria: "함께 탐색하는 동안 서로의 영역을 존중하며 평온함 유지"
                    }
                ]
            }
        ]
    },
    {
        id: "fear_avoidance",
        title: "[괜찮아, 조금씩!] 용기 내기 수업",
        description: "두려움은 작게, 용기는 크게! 세상과 천천히 마주하는 과정",
        total_days: 5,
        difficulty: "Hard",
        stages: [
            {
                id: "fear_1",
                day: 1,
                title: "언제든 도망가도 괜찮아",
                goal: "후퇴가 허용될 때 느끼는 심리적 안정감을 통해 패닉을 예방합니다.",
                icon: Wind,
                steps: [
                    {
                        step_number: 1,
                        title: "자극원 오면 쿨하게 뒤로 가기",
                        description: "무서워하는 대상이 오면 억지로 참게 하지 말고 뒤로 후퇴하세요.",
                        success_criteria: "두려움을 느낄 때 짖지 않고 보호자와 함께 3걸음 이상 후퇴"
                    },
                    {
                        step_number: 2,
                        title: "안전 거리에서 숨 고르기",
                        description: "충분히 멀어진 후 간식을 주거나 바닥을 탐색하며 진정시키세요.",
                        success_criteria: "후퇴 후 10초 이내에 다시 간식을 먹거나 냄새를 맡음"
                    },
                    {
                        step_number: 3,
                        title: "강요 없는 관찰의 시간",
                        description: "강아지가 스스로 고개를 내밀 때까지 대기하며 지켜봐 주세요.",
                        success_criteria: "자극 상황에서 보호자를 믿고 의지하며 폭발 없이 마무리"
                    }
                ]
            },
            {
                id: "fear_2",
                day: 2,
                title: "세상에서 가장 안전한 아지트",
                goal: "두려울 때 언제든 숨을 수 있는 든든한 요새(켄넬/집)를 구축합니다.",
                icon: Home,
                steps: [
                    {
                        step_number: 1,
                        title: "어둡고 포근한 하우스 만들기",
                        description: "구석진 곳에 덮개를 씌운 켄넬을 둬서 안식처로 만들어 주세요.",
                        success_criteria: "불편한 소리(초인종 등)가 날 때 스스로 집으로 들어감"
                    },
                    {
                        step_number: 2,
                        title: "아지트 안에서는 무조건 함부로 금지",
                        description: "집에 들어가 있을 때는 어떤 방해도 하지 말고 평화를 보장하세요.",
                        success_criteria: "집 안에서 30초 이상 누워 안정을 취하는 빈도 증가"
                    },
                    {
                        step_number: 3,
                        title: "보호자 곁이 곧 안전함",
                        description: "집이 아니더라도 보호자 다리 사이 등에 숨는 걸 허용해 주세요.",
                        success_criteria: "불안할 때 도망가는 대신 보호자 곁으로 파고들어 의지함"
                    }
                ]
            },
            {
                id: "fear_3",
                day: 3,
                title: "긴장을 녹이는 마법의 이완",
                goal: "깜짝 놀란 뒤에도 빠르게 흥분을 가라앉히는 회복 회로를 만듭니다.",
                icon: Sparkles,
                steps: [
                    {
                        step_number: 1,
                        title: "이완의 순간 포착하기",
                        description: "한숨을 쉬거나 근육의 힘을 빼고 엎드리는 찰나를 놓치지 마세요.",
                        success_criteria: "긴장했던 몸이 3초 이상 이완되는 신호가 보이면 보상"
                    },
                    {
                        step_number: 2,
                        title: "아주 천천히 보상 전달하기",
                        description: "간식을 줄 때도 차분함을 깨지 않게 아주 천천히 내밀어 주세요.",
                        success_criteria: "보상 후 바로 흥분하지 않고 그 자리에 10초 이상 머무름"
                    },
                    {
                        step_number: 3,
                        title: "회복 속도 자가 테스트",
                        description: "놀란 사건 이후 얼마나 빨리 일상으로 돌아오는지 기록해 보세요.",
                        success_criteria: "충격 후 1분 이내에 엎드리거나 하품을 하며 회복됨"
                    }
                ]
            },
            {
                id: "fear_4",
                day: 4,
                title: "안전 벨트 같은 '핸드 터치'",
                goal: "불안한 순간 보호자의 손을 터치하며 스스로 나아갈 용기를 얻습니다.",
                icon: HeartHandshake,
                steps: [
                    {
                        step_number: 1,
                        title: "손바닥에 코 찍기 연습",
                        description: "손바닥을 내밀 때마다 코를 콩 찍으며 기분 좋음을 연결하세요.",
                        success_criteria: "명확한 손 제시에 2초 내로 즉각 터치 성공"
                    },
                    {
                        step_number: 2,
                        title: "자극 대상을 뒤로하고 터치",
                        description: "대상이 보일 때 보호자 손을 터치하며 안심하고 나를 보게 하세요.",
                        success_criteria: "자극물이 근거리 내에서도 3회 연속 터치 미션 성공"
                    },
                    {
                        step_number: 3,
                        title: "용기 있는 한 걸음에 잭팟",
                        description: "터치 후 스스로 대상 쪽으로 한 걸음 전진한다면 최고의 상을 줍니다.",
                        success_criteria: "터치 습관을 통해 자발적인 탐색 의지가 살아남"
                    }
                ]
            },
            {
                id: "fear_5",
                day: 5,
                title: "차분한 구경꾼 되기 기초",
                goal: "공포 대상을 보고도 패닉 없이 거리감을 조절하며 공존하는 법을 배웁니다.",
                icon: CloudRain,
                steps: [
                    {
                        step_number: 1,
                        title: "내 아이만의 '매너 거리' 찾기",
                        description: "전혀 반응하지 않고 평안을 유지할 수 있는 딱 그 거리를 찾으세요.",
                        success_criteria: "대상을 10초 이상 바라보면서도 경직 없이 간식 섭취 가능"
                    },
                    {
                        step_number: 2,
                        title: "1초 관찰 후 나를 보기",
                        description: "대상을 슥 쳐다봤다 바로 나를 볼 때 칭찬의 폭풍을 선물하세요.",
                        success_criteria: "확인-체크인-보상으로 이어지는 흐름이 5회 연속 완성"
                    },
                    {
                        step_number: 3,
                        title: "소리에 대한 기분 좋은 선물",
                        description: "무서운 소리가 날 때마다 맛있는 것이 떨어진다는 공식을 굳힙니다.",
                        success_criteria: "갑작스러운 소리에도 도망 대신 간식을 기대하는 눈빛 발사"
                    }
                ]
            }
        ]
    }
];
