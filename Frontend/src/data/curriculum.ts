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
                goal: "보호자의 외출 준비 신호를 일상적인 소음으로 받아들이게 합니다. 강아지가 '나가는구나!'라고 긴장하기 전의 상태를 유지하는 것이 핵심입니다.",
                icon: Home,
                steps: [
                    {
                        step_number: 1,
                        title: "외출복 입고 소파에서 힐링하기",
                        description: "평소 외출할 때 입는 옷을 완벽하게 갖춰 입으세요. 코트, 양말, 가방까지 챙긴 뒤 현관으로 가지 말고 소파에 앉아 10분간 TV를 보거나 책을 읽으며 '이 옷은 외출의 신호가 아니다'라는 것을 평온하게 보여주세요.",
                        success_criteria: "옷 갈아입는 소리에 벌떡 일어나지 않고, 보호자가 소파에 앉았을 때 옆에서 하품을 하거나 다시 잠을 청함"
                    },
                    {
                        step_number: 2,
                        title: "가방 챙기는 소리 'ASMR' 만들기",
                        description: "차 키를 짤랑거리거나 가방 지퍼를 열고 닫는 소리를 5분간 반복하세요. 소리를 내면서 강아지에게 간식을 하나씩 던져주어, 외출 소음이 들리면 기분 좋은 일이 생긴다는 인식을 심어줍니다.",
                        success_criteria: "소지품 소음이 들려도 현관으로 달려가지 않고 제자리에서 꼬리를 흔들며 간식을 기다림"
                    },
                    {
                        step_number: 3,
                        title: "현관 다녀오기 (빈 손 복귀 매직)",
                        description: "신발을 신고 도어락 소리를 낸 뒤 현관 밖으로 나가지 않고 바로 돌아오세요. 이 과정을 5회 반복합니다. 나갔다 들어오는 것이 아주 사소하고 일상적인 이벤트임을 알려주는 과정입니다.",
                        success_criteria: "현관 접근에도 짖지 않고, 보호자가 돌아왔을 때 흥분해서 점프하지 않으며 차분히 앉아 있음"
                    }
                ]
            },
            {
                id: "sep_2",
                day: 2,
                title: "문 너머 세상과 '안녕' 하는 법",
                goal: "현관문이 닫히는 소리를 '영원한 이별'이 아닌 '잠시후의 만남'이라는 약속의 신호로 바꿉니다.",
                icon: Shield,
                steps: [
                    {
                        step_number: 1,
                        title: "문고리 소리 들려주기 & 간식 폭탄",
                        description: "문고리를 잡고 '철컥' 소리를 낼 때마다 발 밑에 간식을 떨어뜨려 주세요. 문을 열지 않아도 문고리 소리만으로 긴장하는 아이들에게 효과적입니다. 10회 이상 반복하여 소리에 무뎌지게 하세요.",
                        success_criteria: "문고리 소리 후 10초간 짖거나 현관으로 돌진하지 않고 바닥의 간식을 찾는 데 집중함"
                    },
                    {
                        step_number: 2,
                        title: "3초간의 아주 짧은 매직 작별",
                        description: "문을 열고 나간 뒤 딱 3초만 세고 다시 들어오세요. 돌아왔을 때 과하게 인사하지 않는 것이 중요합니다. '잠깐 나갔다 왔어, 별거 아니지?'라는 태도를 유지하세요. 이를 10회 반복합니다.",
                        success_criteria: "보호자가 들어올 때 점프하거나 낑낑거리지 않고 네 발을 바닥에 붙인 채 차분히 맞이함"
                    },
                    {
                        step_number: 3,
                        title: "1분간의 혼자 있는 인내심 연습",
                        description: "부재 시간을 10초, 30초, 1분으로 조금씩 늘려보세요. 문 밖에서 강아지의 숨소리를 체크하며 조용히 기다립니다. 만약 짖는다면 시간을 다시 10초로 줄여 성공 경험을 만들어줘야 합니다.",
                        success_criteria: "1분 동안 짖거나 문을 긁는 행동 없이, 문 앞에서 엎드려 기다리거나 자기 자리로 이동함"
                    }
                ]
            },
            {
                id: "sep_3",
                day: 3,
                title: "코끝으로 만나는 즐거운 몰입",
                goal: "혼자 있는 시간을 보호자에 대한 그리움이 아닌, 스스로 문제를 해결하는 집중력 있는 놀이 시간으로 전환합니다.",
                icon: Music,
                steps: [
                    {
                        step_number: 1,
                        title: "수건 속에 숨겨진 5단계 보물 찾기",
                        description: "마른 수건 곳곳에 간식을 숨기고 여러 번 접어 돌돌 말아주세요. 강아지가 앞발과 코를 사용해 수건을 하나씩 펼쳐가며 간식을 찾아내야 합니다. 처음에는 쉽게, 점점 어렵게 난이도를 조절하세요.",
                        success_criteria: "보호자가 옆에 없어도 2분 이상 킁킁거리며 수건 속 간식 찾기에만 완벽히 몰입함"
                    },
                    {
                        step_number: 2,
                        title: "단단한 매듭 풀기 중급 챌린지",
                        description: "수건이나 낡은 양말 두 개를 서로 엮어 단단하게 매듭을 지어보세요. 그 틈새에 말랑한 간식을 끼워 넣습니다. 매듭을 풀거나 씹으면서 도파민이 분비되어 불안감이 즐거움으로 승화됩니다.",
                        success_criteria: "3분 이상 포기하지 않고 냄새 맡기와 매듭 풀기 시도를 이어가며 꼬리를 살랑임"
                    },
                    {
                        step_number: 3,
                        title: "박스 노즈워크 완결판: 보물 상자",
                        description: "종이 박스(택배 박스 등) 안에 신문지를 구겨 넣고 그 사이에 간식을 20알 정도 숨기세요. 박스 입구를 살짝 닫아둡니다. 강아지가 박스를 뜯고 파헤치며 야생의 사냥 본능을 충족하게 해주세요.",
                        success_criteria: "5분 이상 집중하여 박스를 탐색하며, 보호자가 방으로 들어가도 전혀 신경 쓰지 않음"
                    }
                ]
            },
            {
                id: "sep_4",
                day: 4,
                title: "보호자가 안 보여도 괜찮아요",
                goal: "시야에서 사라져도 '우린 곧 다시 연결될 것'이라는 확신을 심어줍니다. 집 안에서의 독립성 키우기가 목표입니다.",
                icon: Dog,
                steps: [
                    {
                        step_number: 1,
                        title: "방석 위에서 1분간의 명상 대기",
                        description: "강아지를 전용 방석(하우스)에 앉히고 '기다려' 신호를 준 뒤 1m 뒤로 물러나 1분간 대기하세요. 성공하면 격하게 칭찬하지 말고 차분하게 간식 한 알을 방석 위로 던져줍니다.",
                        success_criteria: "1분 이상 방석에서 이탈하지 않고 보호자를 편안하게 바라보며 대기함"
                    },
                    {
                        step_number: 2,
                        title: "문턱 너머 '투명 벽' 연습",
                        description: "보호자가 화장실이나 주방으로 이동할 때 강아지가 따라오지 못하게 부드럽게 거절하세요. 문턱을 넘으려 하면 몸으로 막아서고, 제자리에 머물면 멀리서 간식을 던져 보상합니다.",
                        success_criteria: "보호자 이동 시 따라오지 않고 30초 이상 제자리에서 얌전히 보호자의 귀가를 지켜봄"
                    },
                    {
                        step_number: 3,
                        title: "방 문을 닫고 '5분의 기적'",
                        description: "방 안으로 들어가 문을 닫고 시야를 완전히 차단하세요. 처음에는 10초, 성공하면 1분, 5분까지 늘립니다. 방 안에서 작은 부스럭 소리를 내어 보호자가 안에 있음을 인지시켜주세요.",
                        success_criteria: "시야 차단 후에도 5분간 짖거나 문을 긁지 않고 평온하게 자기 할 일을 함"
                    }
                ]
            },
            {
                id: "sep_5",
                day: 5,
                title: "쿨한 이별과 뜨거운 재회 매너",
                goal: "나갈 때와 들어올 때의 감정 기복을 0으로 만들어, 산책 가듯 외출하는 일상을 만듭니다.",
                icon: Eye,
                steps: [
                    {
                        step_number: 1,
                        title: "외출 15분 전 '유령 보호자' 모드",
                        description: "외출 준비를 마친 뒤 15분간 강아지에게 말을 걸거나 눈을 맞추지 마세요. 과도한 이별 인사는 강아지의 불안을 증폭시킵니다. 무심하게 준비를 마치고 '갔다 올게' 한 마디면 충분합니다.",
                        success_criteria: "외출 직전 조르기나 낑낑거림 없이 스스로 구석에서 쉬거나 장난감을 가지고 노는 모습"
                    },
                    {
                        step_number: 2,
                        title: "귀가 후 5분간의 '무관심' 골든타임",
                        description: "집에 오자마자 예쁘다고 안아주지 마세요. 짐을 정리하고 손을 씻는 등 5분간 투명인간 취급을 합니다. 강아지가 흥분해서 뛰어오를수록 더 무시해야 합니다. 차분해질 때가 진짜 인사 타임입니다.",
                        success_criteria: "보호자 귀가 후 5분 내에 흥분을 스스로 가라앉고 네 발을 바닥에 붙이고 기다리는 상태"
                    },
                    {
                        step_number: 3,
                        title: "차분한 네 발에 '최고의 보상'",
                        description: "강아지가 흥분을 가라앉히고 하품을 하거나 자리에 앉았을 때, 그때 비로소 낮고 차분한 목소리로 인사하며 쓰다듬어 주세요. '차분하게 있으면 사랑받는다'는 공식을 완성하는 단계입니다.",
                        success_criteria: "귀가 후 5초 이상 점프나 짖음 없이 보호자를 조용히 응시하며 칭찬을 기다리는 모습"
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
                goal: "자극이 들어오는 경로를 물리적/청각적으로 보완하여 짖음의 근본 원인을 차단하고 평온함을 유지합니다.",
                icon: Lock,
                steps: [
                    {
                        step_number: 1,
                        title: "백색소음으로 외부 자극 차단하기",
                        description: "정적 속에 들리는 복도 발소리나 엘리베이터 음은 강아지에게 더 날카롭게 들립니다. 유튜브나 앱을 통해 '강아지 안정 백색소음'이나 클래식 음악을 틀어주세요. 외부 소음이 묻힐 정도로 볼륨을 조절하는 것이 핵심입니다.",
                        success_criteria: "복도에 사람이 지나가는 소리가 들려도 짖지 않거나, 1~2번 짧게 경고 후 스스로 보호자 곁으로 돌아옴"
                    },
                    {
                        step_number: 2,
                        title: "현관 돌진 방지벽 '매직 가드' 설치",
                        description: "현관이나 창가는 자극이 가장 강한 곳입니다. 중문이 없다면 안전펜스를 설치하거나 가구 배치를 바꿔 즉각 달려가지 못하게 물리적 거리를 만드세요. 시야가 차단되면 경계심도 함께 낮아집니다.",
                        success_criteria: "초인종 소리가 들려도 현관문 앞까지 튀어 나가지 않고, 정해진 안전 구역 내에서 상황을 살핌"
                    },
                    {
                        step_number: 3,
                        title: "스스로 포기할 때 '무한 칭찬'하기",
                        description: "짖다가 스스로 멈추고 보호자를 쳐다보는 찰나를 놓치지 마세요. 짖는 도중에는 무시하고, 조용해진 1초 뒤에 바로 간식을 줍니다. '짖지 않아도 안전하다'는 신뢰를 쌓아가는 과정입니다.",
                        success_criteria: "외부 자극 후 5초 내로 상황 파악을 끝내고 스스로 보호자에게 돌아와 눈을 맞춤"
                    }
                ]
            },
            {
                id: "bark_2",
                day: 2,
                title: "소리가 나면? '내 본부'로 이동!",
                goal: "짖는 대신 안전한 매트로 돌아가는 '대체 행동' 루틴을 만듭니다. 짖음의 감정을 안정의 행동으로 바꿉니다.",
                icon: Flag,
                steps: [
                    {
                        step_number: 1,
                        title: "매트로 즐겁게 '체크인' 훈련",
                        description: "강아지를 매트로 부르고 그곳이 세상에서 가장 안전하고 맛있는 간식이 나오는 곳임을 알려주세요. 매트 위에 올라가면 '잘했어'와 함께 간식을 연달아 3~4회 지급하여 매트의 가치를 높입니다.",
                        success_criteria: "매트로 가라는 신호에 맞춰 2초 내로 달려가 자리를 잡고 보호자를 기대 어린 표정으로 바라봄"
                    },
                    {
                        step_number: 2,
                        title: "소리 들리자마자 '자리로' 긴급 출동",
                        description: "작은 외부음이 들리는 즉시, 아이가 짖기 '직전'에 매트로 가라는 신호를 주세요. 이미 짖기 시작했다면 간식으로 유도해서라도 매트로 데려갑니다. '소리=매트 가는 시간'이라는 공식을 만듭니다.",
                        success_criteria: "복도 소음이나 문 두드리는 소리 직후, 짖는 대신 스스로 매트로 이동하여 엎드림"
                    },
                    {
                        step_number: 3,
                        title: "매트에서 누리는 '스테이' 평화",
                        description: "매트 위에서 기다리는 시간을 10초에서 1분까지 늘려보세요. 소음이 다 지나갈 때까지 매트에서 차분히 기다리면 큰 보상을 줍니다. 매트는 단순한 장소가 아니라 강아지의 감정 조절 장치가 됩니다.",
                        success_criteria: "외부 자극이 지속되는 동안 매트에서 이탈하지 않고 1분 이상 차분하게 엎드려 대기함"
                    }
                ]
            },
            {
                id: "bark_3",
                day: 3,
                title: "흥분 대신 보호자랑 '아이컨택'",
                goal: "짖음 본능이 폭발하기 전, 보호자에게 집중해 행동의 흐름을 끊고 감정을 전환합니다.",
                icon: Sparkles,
                steps: [
                    {
                        step_number: 1,
                        title: "이름 한 번에 주의 환기 (리콜)",
                        description: "짖으려는 기색이 보일 때 밝고 높은 톤으로 이름을 불러주세요. 아이가 돌아보면 바로 간식을 주며 칭찬합니다. 보호자의 목소리가 외부 소음보다 더 매력적이어야 행동이 멈춥니다.",
                        success_criteria: "이름을 부르면 2초 내에 짖으려던 입을 닫고 고개를 돌려 보호자를 응시함"
                    },
                    {
                        step_number: 2,
                        title: "손바닥 가이드 터치 (Targeting)",
                        description: "손바닥을 내밀어 코를 대게 하는 '터치' 동작을 시키세요. 신체적인 움직임을 유도하면 짖으려던 신경 회로가 행동 수행 회로로 전환됩니다. 5회 연속 성공할 때까지 연습하세요.",
                        success_criteria: "손바닥 신호에 즉각 반응하여 코를 대며, 외부 자극에 대한 집착을 완전히 내려놓음"
                    },
                    {
                        step_number: 3,
                        title: "성공적인 감정 조절 '폭풍 칭찬'",
                        description: "주의 산만 요소를 이겨내고 보호자에게 집중했다면 가장 아끼는 장난감이나 간식을 제공하세요. '짖는 것보다 엄마/아빠 말 듣는 게 훨씬 이득이네!'라고 느끼게 하는 것이 핵심입니다.",
                        success_criteria: "행동 전환 후 1분 이상 추가 짖음 없이 보호자와 놀이에 집중하거나 평온을 유지함"
                    }
                ]
            },
            {
                id: "bark_4",
                day: 4,
                title: "목소리보다 강한 '코'의 힘",
                goal: "공격적이고 경계적인 짖음의 에너지를 가장 원초적인 즐거움인 후각 탐색(노즈워크)으로 전환합니다.",
                icon: Footprints,
                steps: [
                    {
                        step_number: 1,
                        title: "소음을 탐색의 신호로 재정의",
                        description: "작은 소리가 들리면 바로 '맛있는 거 어디 있지?'라고 즐겁게 말하며 간식 한 알을 던져주세요. 이제 강아지에게 소음은 경계 대상이 아니라 '놀이 시작'의 알림음이 됩니다.",
                        success_criteria: "외부 소리가 들렸을 때 짖는 대신 꼬리를 흔들며 바닥을 훑기 시작함"
                    },
                    {
                        step_number: 2,
                        title: "바닥에 주어지는 '10알의 기적'",
                        description: "짖음이 시작되려 할 때 간식 10여 알을 바닥에 넓게 흩뿌려주세요. 코를 바닥에 박고 냄새를 맡는 순간, 신체적으로 짖기가 어려워지며 심박수가 안정됩니다.",
                        success_criteria: "간식을 찾는 2분 동안 단 한 번의 짖음도 없이 탐색 행위에만 완벽히 몰입함"
                    },
                    {
                        step_number: 3,
                        title: "탐색 끝, 진정 모드 안착",
                        description: "간식을 다 찾은 뒤 스스로 혀를 낼름거리며 진정할 때 '옳지'라고 말해주세요. 격렬한 활동 뒤의 정적을 강아지가 즐길 수 있도록 부드럽게 쓰다듬으며 마무리합니다.",
                        success_criteria: "노즈워크 종료 후 흥분이 이어지지 않고 곧바로 자신의 자리로 가서 휴식을 취함"
                    }
                ]
            },
            {
                id: "bark_5",
                day: 5,
                title: "소리가 들리면 좋은 일이 생겨요",
                goal: "소음을 '무서운 침입자'가 아닌, '기분 좋은 선물(보상)'의 예고편으로 인식을 완전히 뒤바꿉니다.",
                icon: Music,
                steps: [
                    {
                        step_number: 1,
                        title: "인위적인 소음 적응 훈련",
                        description: "가족에게 부탁해 밖에서 문을 살짝 두드리거나 발소리를 내게 하세요. 소리가 나자마자 최애 간식을 줍니다. 처음에는 아주 작은 소리부터 시작해 점차 강도를 높여갑니다.",
                        success_criteria: "의도적인 소음 발생 시 짖지 않고 보호자를 쳐다보며 간식을 기대하는 표정을 지음"
                    },
                    {
                        step_number: 2,
                        title: "소음 둔감화 마스터 클래스",
                        description: "이제 예기치 못한 소리(배달 기사님 소리 등)에도 덤덤하게 간식을 기다리는지 확인하세요. 자극에 무덤덤하거나 보호자를 먼저 쳐다볼 때 '잭팟' 보상(평소의 5배)을 줍니다.",
                        success_criteria: "갑작스러운 소음에도 깜짝 놀라지 않고 꼬리를 흔들며 보호자 옆에 착 붙음"
                    },
                    {
                        step_number: 3,
                        title: "평온함이 DNA가 되는 날",
                        description: "소리가 나면 간식, 소리가 멈추면 보상도 멈춤을 명확히 하세요. '소리=간식' 공식이 머릿속에 박히면 외부 소음은 더 이상 스트레스가 아닌 즐거운 이벤트가 됩니다. 훈련 졸업을 축하하세요!",
                        success_criteria: "어떤 자극에도 흥분이 10초 이상 유지되지 않고 즉시 평상시의 차분한 상태로 복귀함"
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
                title: "실수 장소를 '행복 생활 구역'으로",
                goal: "과거 실수했던 장소의 냄새를 완벽히 지우고, 그곳을 배변 장소가 아닌 '생활 공간'으로 새롭게 인식시킵니다.",
                icon: Trash2,
                steps: [
                    {
                        step_number: 1,
                        title: "냄새 분자 파괴! 효소 세정제 딥클리닝",
                        description: "일반 락스나 세제는 냄새를 덮을 뿐, 강아지의 코는 여전히 소변 냄새를 찾아냅니다. 반려동물 전용 '단백질 분해 효소 세정제'를 사용해 해당 구역을 흠뻑 적신 뒤 10분간 방치하고 닦아내세요. 냄새 분자를 완전히 파괴하는 것이 첫걸음입니다.",
                        success_criteria: "동일한 지점에서의 재실수가 48시간 내에 0회이며, 강아지가 그곳의 냄새를 맡고 맴도는 행동이 사라짐"
                    },
                    {
                        step_number: 2,
                        title: "그곳에서 즐기는 '최고의 만찬'",
                        description: "강아지는 자신이 잠자거나 밥 먹는 곳에는 배변하지 않는 본능이 있습니다. 실수하던 자리에 밥그릇을 두고 가장 좋아하는 간식이나 사료를 급여하세요. '여기는 식당이지 화장실이 아니야'라는 인식을 심어줍니다.",
                        success_criteria: "해당 구역에서 배변 자세를 잡으려는 시도가 0회이며, 배고플 때 그 자리에 가서 밥을 기다림"
                    },
                    {
                        step_number: 3,
                        title: "놀이와 애착으로 채워지는 긍정 공간",
                        description: "그 장소에서 터그 놀이를 하거나 부드럽게 쓰다듬어 주며 함께 시간을 보내세요. 집안의 사각지대였던 곳을 가족과의 소중한 추억이 담긴 '거실의 연장선'으로 만드는 과정입니다.",
                        success_criteria: "해당 구역에서 장난감을 가지고 놀거나 편안하게 엎드려 쉬는 모습이 관찰됨"
                    }
                ]
            },
            {
                id: "toilet_2",
                day: 2,
                title: "골든타임을 잡아라! '에스코트' 유도",
                goal: "배변 신호가 올 때 보호자가 정확한 타이밍에 개입하여 지정 장소로 안전하게 안내합니다.",
                icon: MapPin,
                steps: [
                    {
                        step_number: 1,
                        title: "식후 즉시 '화장실 특급 열차' 탑승",
                        description: "사료를 먹은 뒤나 잠에서 깬 직후는 배변 확률이 90% 이상입니다. 강아지가 바닥을 킁킁거리며 빙글빙글 돌기 시작하면, 지체 없이 간식으로 유도하거나 안아서 지정된 패드 위로 데려가세요.",
                        success_criteria: "배변 신호 포착 후 30초 내로 아이를 지정된 패드 위에 안착시키는 데 성공함"
                    },
                    {
                        step_number: 2,
                        title: "성공의 찰나, '잭팟' 보상과 폭풍 칭찬",
                        description: "패드 위에 볼일을 보는 '그 순간' 즉시 높은 톤의 목소리로 칭찬하고, 평소보다 3배 더 맛있는 간식을 입에 넣어주세요. 성공과 보상 사이의 간격이 짧을수록 학습 속도는 비약적으로 빨라집니다.",
                        success_criteria: "지정 장소에서 배변을 마친 뒤, 보호자의 칭찬을 기대하며 꼬리를 흔들며 다가옴"
                    },
                    {
                        step_number: 3,
                        title: "성공 뒤에 찾아오는 '거실 산책' 자유",
                        description: "정확한 곳에 볼일을 봤다면 이제 집안을 마음껏 돌아다닐 수 있는 자유 시간을 주세요. 배변 성공이 곧 즐거운 자유와 연결된다는 보상 체계를 완성하는 단계입니다.",
                        success_criteria: "배변 후 스스로 지정 장소를 빠져나와 보호자와의 상호작용(놀이 등)에 기쁘게 참여함"
                    }
                ]
            },
            {
                id: "toilet_3",
                day: 3,
                title: "발끝으로 느끼는 '폭신폭신' 패드 촉감",
                goal: "발바닥에 닿는 패드의 고유한 촉감을 배변을 시작해야 하는 '스위치'로 기억하게 합니다.",
                icon: Footprints,
                steps: [
                    {
                        step_number: 1,
                        title: "러그와 발매트는 잠시 '안녕'",
                        description: "강아지는 패드와 비슷한 촉감의 러그나 발매트를 화장실로 오인하기 쉽습니다. 교육 기간 동안에는 집안의 모든 푹신한 직물을 치워주세요. 오직 패드만이 유일하게 푹신한 장소여야 합니다.",
                        success_criteria: "배변 전 맴돌기 행동 시 바닥재와 패드의 촉감 차이를 인지하고 패드 위로 스스로 올라감"
                    },
                    {
                        step_number: 2,
                        title: "맨바닥은 오직 'Play & Eat' 구역",
                        description: "딱딱한 맨바닥에서 간식 노즈워크를 하거나 노는 시간을 늘리세요. 맨바닥은 즐거운 일을 하는 곳이고, 패드는 볼일을 보는 곳이라는 촉감 기반의 이분법적 인식을 심어줍니다.",
                        success_criteria: "맨바닥에서 배변 자세를 시도하려다 스스로 멈추고 패드를 찾아 이동하는 모습 포착"
                    },
                    {
                        step_number: 3,
                        title: "완벽한 '네 발 안착' 가이드",
                        description: "조준 실패 방지를 위해 앞발만 걸치는 게 아니라 몸 전체가 패드 중앙에 오도록 유도하세요. 패드를 여러 장 겹쳐 깔아 범위를 넓혀주는 것도 좋은 방법입니다. 네 발이 모두 패드 위에 있을 때만 보상하세요.",
                        success_criteria: "네 발이 모두 패드 안쪽으로 들어온 안정적인 자세로 3회 연속 배변에 성공함"
                    }
                ]
            },
            {
                id: "toilet_4",
                day: 4,
                title: "코가 알려주는 '나만의 화장실'",
                goal: "보호자의 안내 없이도 냄새(후각)를 통해 자신의 화장실 위치를 스스로 찾아가게 합니다.",
                icon: Wind,
                steps: [
                    {
                        step_number: 1,
                        title: "천연 '냄새 가이드' 활용하기",
                        description: "완전히 깨끗한 새 패드는 강아지에게 생소할 수 있습니다. 새 패드 중앙에 이전에 묻힌 소변을 아주 살짝 묻혀두세요. 익숙한 자신의 냄새가 '여기가 네 화장실이야'라고 친절하게 알려줄 것입니다.",
                        success_criteria: "새 패드 교체 후 곧바로 냄새를 맡으며 자신의 영역임을 확인하고 안심하는 모습"
                    },
                    {
                        step_number: 2,
                        title: "스스로 찾아가는 '독립 배변' 테스트",
                        description: "보호자가 유도하지 말고 멀리서 지켜보세요. 강아지가 스스로 자기 방을 나와 화장실 패드까지 이동하는지 확인합니다. 성공하면 즉시 달려가서 간식 보상을 듬뿍 줍니다.",
                        success_criteria: "보호자의 신호나 도움 없이 스스로 화장실로 이동하여 3회 연속 정확하게 배변 성공"
                    },
                    {
                        step_number: 3,
                        title: "무취 패드 완벽 마스터",
                        description: "이제 소변을 묻히지 않은 순수한 새 패드만 깔아두세요. 냄새 가이드 없이도 '패드라는 대상=화장실'이라는 개념이 머릿속에 완전히 정착되었는지 최종 확인하는 날입니다. ",
                        success_criteria: "완전 새 패드에서도 주저함 없이 스스로 찾아가 완벽한 위치에 배변 3회 연속 수행"
                    }
                ]
            },
            {
                id: "toilet_5",
                day: 5,
                title: "화장실 영토 '미니멀리즘' 완성",
                goal: "넓게 깔아두었던 패드 범위를 점진적으로 줄여, 단 한 장의 패드 위에서도 실수 없는 타겟 능력을 완성합니다.",
                icon: Flag,
                steps: [
                    {
                        step_number: 1,
                        title: "안전하게 '울타리'와 '5장 패드' 시작",
                        description: "처음에는 패드를 넓게(5장 이상) 깔고 울타리로 범위를 좁혀주어 물리적 성공 확률을 100%로 만드세요. 실수를 아예 할 수 없는 환경을 만들어 자신감을 심어주는 것이 중요합니다.",
                        success_criteria: "제한된 울타리 내 넓은 패드 위에서 실수 없이 100% 확률로 배변 성공"
                    },
                    {
                        step_number: 2,
                        title: "하루 한 장씩! '패드 다이어트'",
                        description: "성공률이 안정되면 가장자리 패드부터 한 장씩 서서히 치워주세요. 강아지가 인지하지 못할 정도로 천천히 범위를 좁혀가며, 좁아진 범위에서도 정확히 조준하도록 유도합니다.",
                        success_criteria: "패드 장수가 줄어들어도 실수 없이 정확히 남은 패드 위로 올라가 3회 연속 성공"
                    },
                    {
                        step_number: 3,
                        title: "단 1장의 '프로 배변러' 졸업",
                        description: "마지막 한 장의 패드 위에서 완벽하게 볼일을 마치는 아이를 보며 뜨겁게 축하해 주세요. 이제 울타리를 치워도 스스로 한 장의 패드를 찾아가는 완벽한 배변 매너를 갖추게 되었습니다!",
                        success_criteria: "패드 1장만 남은 개방된 상태에서 일주일간 실수 0회 달성 (배변 교육 졸업)"
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
