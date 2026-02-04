import { Wind, Home, Sparkles, HeartHandshake, CloudRain } from "lucide-react";
import { TrainingCourse } from "../types";

export const fearAvoidance: TrainingCourse = {
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
                    success_criteria: "두려움을 느낄 때 짖지 않고 보호자와 함께 3걸음 이상 후퇴",
                    alternatives: [
                        {
                            id: "B",
                            title: "'보호자 등 뒤'로 숨기기",
                            description: "뒤로 가도 불안해한다면, 보호자가 대상과 강아지 사이를 몸으로 완전히 가로막아 서세요. 보호자가 '방패'가 되어준다는 확신을 줍니다."
                        }
                    ]
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
                    success_criteria: "집 안에서 30초 이상 누워 안정을 취하는 빈도 증가",
                    alternatives: [
                        {
                            id: "B",
                            title: "'하우스 근처' 간식 비 내리기",
                            description: "집 안에서도 떨고 있다면, 억지로 만지지 말고 하우스 구멍으로 간식만 조용히 넣어주세요. '집 안에 있으면 좋은 일이 알아서 온다'는 믿음을 줍니다."
                        }
                    ]
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
                    success_criteria: "명확한 손 제시에 2초 내로 즉각 터치 성공",
                    alternatives: [
                        {
                            id: "B",
                            title: "'긴 막대(타겟스틱)' 터치",
                            description: "보호자의 손이 다가오는 것조차 무서워한다면, 긴 막대기 끝에 간식을 붙여 거리를 두고 터치하게 하세요. 신체적 접촉 부담을 줄이면서 타겟팅 훈련의 효과를 가져갑니다."
                        }
                    ]
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
                    success_criteria: "확인-체크인-보상으로 이어지는 흐름이 5회 연속 완성",
                    alternatives: [
                        {
                            id: "B",
                            title: "'거울'이나 '영상'으로 관찰",
                            description: "실물을 보는 게 패닉이라면, 멀리서 거울로 대상을 비춰보거나 TV 화면에 나오는 대상을 보며 간식 먹는 연습부터 시작합니다."
                        }
                    ]
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
};
