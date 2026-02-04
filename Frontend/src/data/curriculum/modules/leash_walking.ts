import { Home, Eye, Anchor, Footprints, Shield, Wind } from "lucide-react";
import { TrainingCourse } from "../types";

export const leashWalking: TrainingCourse = {
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
                    success_criteria: "리드줄 착용 후 30초 이내에 과도한 흥분 없이 걸음",
                    alternatives: [
                        {
                            id: "B",
                            title: "'줄' 바닥에 늘어뜨리고 간식 먹기",
                            description: "줄을 매는 것만으로 굳어버린다면, 줄을 강아지 몸에 매지 말고 그냥 바닥에 두세요. 줄 근처에서 간식을 먹으며 '줄은 무서운 게 아니다'를 먼저 배웁니다."
                        }
                    ]
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
                    success_criteria: "당김이 느껴지자마자 일관되게 정지 상태 유지",
                    alternatives: [
                        {
                            id: "B",
                            title: "'L자 걷기' (직각 회전)",
                            description: "멈추는 게 효과 없다면, 강아지가 당길 때 보호자가 강아지의 앞을 가로막으며 90도 옆으로 방향을 트세요. 보호자의 움직임에 강아지가 계속 신경 쓰게 만듭니다."
                        }
                    ]
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
                    success_criteria: "자극을 발견해도 3초 이상 차분히 서서 기다릴 수 있음",
                    alternatives: [
                        {
                            id: "B",
                            title: "'자동차' 안에서 구경하기",
                            description: "밖에서 다른 개를 보는 게 너무 흥분된다면, 주차된 차 안이나 카페 창가처럼 물리적으로 완전히 분리된 곳에서 창밖의 개들을 구경하며 간식을 먹으세요."
                        }
                    ]
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
                    success_criteria: "리드줄이 일관되게 느슨한 상태로 20걸음 이상 이동",
                    alternatives: [
                        {
                            id: "B",
                            title: "'S자' 곡선 걷기",
                            description: "일직선 걷기가 지루해 당긴다면, 지그재그로 걸으며 보호자의 발걸음에 집중하지 않으면 길을 잃을 것 같은 환경을 만드세요."
                        }
                    ]
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
};
