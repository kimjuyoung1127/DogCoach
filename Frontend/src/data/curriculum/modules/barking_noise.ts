import { Lock, Flag, Sparkles, Footprints, Music } from "lucide-react";
import { TrainingCourse } from "../types";

export const barkingNoise: TrainingCourse = {
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
                    success_criteria: "복도에 사람이 지나가는 소리가 들려도 짖지 않거나, 1~2번 짧게 경고 후 스스로 보호자 곁으로 돌아옴",
                    tags: ["sound_desensitization"],
                    alternatives: [
                        {
                            id: "B",
                            title: "'간식 흩뿌리기' (Scatter Feeding)",
                            description: "소리가 들릴 때 소음으로 덮는 게 실패했다면, 소리가 들리는 순간 바닥에 작은 간식 10알을 넓게 뿌리세요. 고개를 숙이고 냄새를 맡는 신체 구조는 짖는 행위를 물리적으로 억제합니다."
                        }
                    ]
                },
                {
                    step_number: 2,
                    title: "현관 돌진 방지벽 '매직 가드' 설치",
                    description: "현관이나 창가는 자극이 가장 강한 곳입니다. 중문이 없다면 안전펜스를 설치하거나 가구 배치를 바꿔 즉각 달려가지 못하게 물리적 거리를 만드세요. 시야가 차단되면 경계심도 함께 낮아집니다.",
                    success_criteria: "초인종 소리가 들려도 현관문 앞까지 튀어 나가지 않고, 정해진 안전 구역 내에서 상황을 살핌",
                    tags: ["kennel", "waiting"]
                },
                {
                    step_number: 3,
                    title: "스스로 포기할 때 '무한 칭찬'하기",
                    description: "짖다가 스스로 멈추고 보호자를 쳐다보는 찰나를 놓치지 마세요. 짖는 도중에는 무시하고, 조용해진 1초 뒤에 바로 간식을 줍니다. '짖지 않아도 안전하다'는 신뢰를 쌓아가는 과정입니다.",
                    success_criteria: "외부 자극 후 5초 내로 상황 파악을 끝내고 스스로 보호자에게 돌아와 눈을 맞춤",
                    tags: ["ignoring", "treat_reward"]
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
                    success_criteria: "매트로 가라는 신호에 맞춰 2초 내로 달려가 자리를 잡고 보호자를 기대 어린 표정으로 바라봄",
                    tags: ["kennel", "treat_reward"],
                    alternatives: [
                        {
                            id: "B",
                            title: "'하우스' 덮개 강화",
                            description: "오픈된 매트로 가는 게 불안하다면, 사방이 막힌 켄넬이나 하우스에 담요를 씌워주세요. 시각적 자극이 완전히 차단된 공간에서 더 빨리 안정감을 찾을 수 있습니다."
                        }
                    ]
                },
                {
                    step_number: 2,
                    title: "소리 들리자마자 '자리로' 긴급 출동",
                    description: "작은 외부음이 들리는 즉시, 아이가 짖기 '직전'에 매트로 가라는 신호를 주세요. 이미 짖기 시작했다면 간식으로 유도해서라도 매트로 데려갑니다. '소리=매트 가는 시간'이라는 공식을 만듭니다.",
                    success_criteria: "복도 소음이나 문 두드리는 소리 직후, 짖는 대신 스스로 매트로 이동하여 엎드림",
                    tags: ["kennel", "sound_desensitization"]
                },
                {
                    step_number: 3,
                    title: "매트에서 누리는 '스테이' 평화",
                    description: "매트 위에서 기다리는 시간을 10초에서 1분까지 늘려보세요. 소음이 다 지나갈 때까지 매트에서 차분히 기다리면 큰 보상을 줍니다. 매트는 단순한 장소가 아니라 강아지의 감정 조절 장치가 됩니다.",
                    success_criteria: "외부 자극이 지속되는 동안 매트에서 이탈하지 않고 1분 이상 차분하게 엎드려 대기함",
                    tags: ["kennel", "waiting"]
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
                    success_criteria: "이름을 부르면 2초 내에 짖으려던 입을 닫고 고개를 돌려 보호자를 응시함",
                    tags: ["treat_reward", "sound_desensitization"]
                },
                {
                    step_number: 2,
                    title: "손바닥 가이드 터치 (Targeting)",
                    description: "손바닥을 내밀어 코를 대게 하는 '터치' 동작을 시키세요. 신체적인 움직임을 유도하면 짖으려던 신경 회로가 행동 수행 회로로 전환됩니다. 5회 연속 성공할 때까지 연습하세요.",
                    success_criteria: "손바닥 신호에 즉각 반응하여 코를 대며, 외부 자극에 대한 집착을 완전히 내려놓음",
                    tags: ["touch", "treat_reward"]
                },
                {
                    step_number: 3,
                    title: "성공적인 감정 조절 '폭풍 칭찬'",
                    description: "주의 산만 요소를 이겨내고 보호자에게 집중했다면 가장 아끼는 장난감이나 간식을 제공하세요. '짖는 것보다 엄마/아빠 말 듣는 게 훨씬 이득이네!'라고 느끼게 하는 것이 핵심입니다.",
                    success_criteria: "행동 전환 후 1분 이상 추가 짖음 없이 보호자와 놀이에 집중하거나 평온을 유지함",
                    tags: ["toy", "treat_reward"]
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
                    success_criteria: "외부 소리가 들렸을 때 짖는 대신 꼬리를 흔들며 바닥을 훑기 시작함",
                    tags: ["nosework", "sound_desensitization"]
                },
                {
                    step_number: 2,
                    title: "바닥에 주어지는 '10알의 기적'",
                    description: "짖음이 시작되려 할 때 간식 10여 알을 바닥에 넓게 흩뿌려주세요. 코를 바닥에 박고 냄새를 맡는 순간, 신체적으로 짖기가 어려워지며 심박수가 안정됩니다.",
                    success_criteria: "간식을 찾는 2분 동안 단 한 번의 짖음도 없이 탐색 행위에만 완벽히 몰입함",
                    tags: ["nosework", "treat_reward"]
                },
                {
                    step_number: 3,
                    title: "탐색 끝, 진정 모드 안착",
                    description: "간식을 다 찾은 뒤 스스로 혀를 낼름거리며 진정할 때 '옳지'라고 말해주세요. 격렬한 활동 뒤의 정적을 강아지가 즐길 수 있도록 부드럽게 쓰다듬으며 마무리합니다.",
                    success_criteria: "노즈워크 종료 후 흥분이 이어지지 않고 곧바로 자신의 자리로 가서 휴식을 취함",
                    tags: ["nosework", "kennel"]
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
                    success_criteria: "의도적인 소음 발생 시 짖지 않고 보호자를 쳐다보며 간식을 기대하는 표정을 지음",
                    tags: ["sound_desensitization", "treat_reward"]
                },
                {
                    step_number: 2,
                    title: "소음 둔감화 마스터 클래스",
                    description: "이제 예기치 못한 소리(배달 기사님 소리 등)에도 덤덤하게 간식을 기다리는지 확인하세요. 자극에 무덤덤하거나 보호자를 먼저 쳐다볼 때 '잭팟' 보상(평소의 5배)을 줍니다.",
                    success_criteria: "갑작스러운 소음에도 깜짝 놀라지 않고 꼬리를 흔들며 보호자 옆에 착 붙음",
                    tags: ["sound_desensitization", "treat_reward"]
                },
                {
                    step_number: 3,
                    title: "평온함이 DNA가 되는 날",
                    description: "소리가 나면 간식, 소리가 멈추면 보상도 멈춤을 명확히 하세요. '소리=간식' 공식이 머릿속에 박히면 외부 소음은 더 이상 스트레스가 아닌 즐거운 이벤트가 됩니다.",
                    success_criteria: "어떤 자극에도 흥분이 10초 이상 유지되지 않고 즉시 평상시의 차분한 상태로 복귀함",
                    tags: ["sound_desensitization"]
                }
            ]
        }
    ]
};
