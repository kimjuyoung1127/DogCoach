import { Home, Shield, Music, Dog, Eye } from "lucide-react";
import { TrainingCourse } from "../types";

export const separationAnxiety: TrainingCourse = {
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
                    success_criteria: "옷 갈아입는 소리에 벌떡 일어나지 않고, 보호자가 소파에 앉았을 때 옆에서 하품을 하거나 다시 잠을 청함",
                    tags: ["ignoring"],
                    alternatives: [
                        {
                            id: "B",
                            title: "외출 소품 '일상화' 놀이",
                            description: "옷을 입는 게 너무 큰 자극이라면, 가방이나 차 키를 거실 바닥에 그냥 두세요. 강아지가 그 물건 근처에서 간식을 찾아 먹게 하여 '외출 물건 = 즐거운 장난감'으로 인식을 바꿉니다."
                        }
                    ]
                },
                {
                    step_number: 2,
                    title: "가방 챙기는 소리 'ASMR' 만들기",
                    description: "차 키를 짤랑거리거나 가방 지퍼를 열고 닫는 소리를 5분간 반복하세요. 소리를 내면서 강아지에게 간식을 하나씩 던져주어, 외출 소음이 들리면 기분 좋은 일이 생긴다는 인식을 심어줍니다.",
                    success_criteria: "소지품 소음이 들려도 현관으로 달려가지 않고 제자리에서 꼬리를 흔들며 간식을 기다림",
                    tags: ["sound_desensitization", "treat_reward"]
                },
                {
                    step_number: 3,
                    title: "현관 다녀오기 (빈 손 복귀 매직)",
                    description: "신발을 신고 도어락 소리를 낸 뒤 현관 밖으로 나가지 않고 바로 돌아오세요. 이 과정을 5회 반복합니다. 나갔다 들어오는 것이 아주 사소하고 일상적인 이벤트임을 알려주는 과정입니다.",
                    success_criteria: "현관 접근에도 짖지 않고, 보호자가 돌아왔을 때 흥분해서 점프하지 않으며 차분히 앉아 있음",
                    tags: ["ignoring", "waiting"],
                    alternatives: [
                        {
                            id: "B",
                            title: "현관 '간식 던지기' 무시",
                            description: "직접 현관까지 가는 게 자극이라면, 거실에 앉아 현관 쪽으로 간식을 툭 던져주세요. 보호자가 현관 쪽으로 움직이는 동선 자체에 대한 경계심을 낮춥니다."
                        }
                    ]
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
                    description: "문고리를 잡고 '철컥' 소리를 낼 때마다 발 밑에 간식을 떨어뜨려 주세요. 문을 열지 않아도 문고리 소만으로 긴장하는 아이들에게 효과적입니다. 10회 이상 반복하여 소리에 무뎌지게 하세요.",
                    success_criteria: "문고리 소리 후 10초간 짖거나 현관으로 돌진하지 않고 바닥의 간식을 찾는 데 집중함",
                    tags: ["sound_desensitization", "treat_reward"]
                },
                {
                    step_number: 2,
                    title: "3초간의 아주 짧은 매직 작별",
                    description: "문을 열고 나간 뒤 딱 3초만 세고 다시 들어오세요. 돌아왔을 때 과하게 인사하지 않는 것이 중요합니다. '잠깐 나갔다 왔어, 별거 아니지?'라는 태도를 유지하세요. 이를 10회 반복합니다.",
                    success_criteria: "보호자가 들어올 때 점프하거나 낑낑거리지 않고 네 발을 바닥에 붙인 채 차분히 맞이함",
                    tags: ["ignoring"],
                    alternatives: [
                        {
                            id: "B",
                            title: "'문 틈' 인사 게임",
                            description: "문을 완전히 닫는 게 공포라면, 문을 10cm만 열어두고 밖에서 보호자의 목소리만 들려주세요. '안 보여도 목소리는 들린다'는 연결감을 먼저 줍니다."
                        }
                    ]
                },
                {
                    step_number: 3,
                    title: "1분간의 혼자 있는 인내심 연습",
                    description: "부재 시간을 10초, 30초, 1분으로 조금씩 늘려보세요. 문 밖에서 강아지의 숨소리를 체크하며 조용히 기다립니다. 만약 짖는다면 시간을 다시 10초로 줄여 성공 경험을 만들어줘야 합니다.",
                    success_criteria: "1분 동안 짖거나 문을 긁는 행동 없이, 문 앞에서 엎드려 기다리거나 자기 자리로 이동함",
                    tags: ["waiting", "ignoring"]
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
                    success_criteria: "보호자가 옆에 없어도 2분 이상 킁킁거리며 수건 속 간식 찾기에만 완벽히 몰입함",
                    tags: ["nosework", "treat_reward"]
                },
                {
                    step_number: 2,
                    title: "단단한 매듭 풀기 중급 챌린지",
                    description: "수건이나 낡은 양말 두 개를 서로 엮어 단단하게 매듭을 지어보세요. 그 틈새에 말랑한 간식을 끼워 넣습니다. 매듭을 풀거나 씹으면서 도파민이 분비되어 불안감이 즐거움으로 승화됩니다.",
                    success_criteria: "3분 이상 포기하지 않고 냄새 맡기와 매듭 풀기 시도를 이어가며 꼬리를 살랑임",
                    tags: ["nosework", "toy", "treat_reward"]
                },
                {
                    step_number: 3,
                    title: "박스 노즈워크 완결판: 보물 상자",
                    description: "종이 박스(택배 박스 등) 안에 신문지를 구겨 넣고 그 사이에 간식을 20알 정도 숨기세요. 박스 입구를 살짝 닫아둡니다. 강아지가 박스를 뜯고 파헤치며 야생의 사냥 본능을 충족하게 해주세요.",
                    success_criteria: "5분 이상 집중하여 박스를 탐색하며, 보호자가 방으로 들어가도 전혀 신경 쓰지 않음",
                    tags: ["nosework", "treat_reward"]
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
                    success_criteria: "1분 이상 방석에서 이탈하지 않고 보호자를 편안하게 바라보며 대기함",
                    tags: ["waiting", "kennel", "treat_reward"]
                },
                {
                    step_number: 2,
                    title: "문턱 너머 '투명 벽' 연습",
                    description: "보호자가 화장실이나 주방으로 이동할 때 강아지가 따라오지 못하게 부드럽게 거절하세요. 문턱을 넘으려 하면 몸으로 막아서고, 제자리에 머물면 멀리서 간식을 던져 보상합니다.",
                    success_criteria: "보호자 이동 시 따라오지 않고 30초 이상 제자리에서 얌전히 보호자의 귀가를 지켜봄",
                    tags: ["waiting", "ignoring"]
                },
                {
                    step_number: 3,
                    title: "방 문을 닫고 '5분의 기적'",
                    description: "방 안으로 들어가 문을 닫고 시야를 완전히 차단하세요. 처음에는 10초, 성공하면 1분, 5분까지 늘립니다. 방 안에서 작은 부스럭 소리를 내어 보호자가 안에 있음을 인지시켜주세요.",
                    success_criteria: "시야 차단 후에도 5분간 짖거나 문을 긁지 않고 평온하게 자기 할 일을 함",
                    tags: ["waiting", "ignoring"]
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
                    success_criteria: "외출 직전 조르기나 낑낑거림 없이 스스로 구석에서 쉬거나 장난감을 가지고 노는 모습",
                    tags: ["ignoring"],
                    alternatives: [
                        {
                            id: "B",
                            title: "사전 '에너지 발산' 놀이",
                            description: "무시하기가 어렵다면 외출 30분 전에 격렬한 노즈워크나 터그놀이로 에너지를 뺍니다. 몸이 피곤하면 이별의 슬픔보다 휴식의 욕구가 앞서게 됩니다."
                        }
                    ]
                },
                {
                    step_number: 2,
                    title: "귀가 후 5분간의 '무관심' 골든타임",
                    description: "집에 오자마자 예쁘다고 안아주지 마세요. 짐을 정리하고 손을 씻는 등 5분간 투명인간 취급을 합니다. 강아지가 흥분해서 뛰어오를수록 더 무시해야 합니다. 차분해질 때가 진짜 인사 타임입니다.",
                    success_criteria: "보호자 귀가 후 5분 내에 흥분을 스스로 가라앉고 네 발을 바닥에 붙이고 기다리는 상태",
                    tags: ["ignoring", "waiting"]
                },
                {
                    step_number: 3,
                    title: "차분한 네 발에 '최고의 보상'",
                    description: "강아지가 흥분을 가라앉히고 하품을 하거나 자리에 앉았을 때, 그때 비로소 낮고 차분한 목소리로 인사하며 쓰다듬어 주세요. '차분하게 있으면 사랑받는다'는 공식을 완성하는 단계입니다.",
                    success_criteria: "귀가 후 5초 이상 점프나 짖음 없이 보호자를 조용히 응시하며 칭찬을 기다리는 모습",
                    tags: ["treat_reward", "touch"]
                }
            ]
        }
    ]
};
