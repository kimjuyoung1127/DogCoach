import { Home, Users, HeartHandshake, Shield, Footprints } from "lucide-react";
import { TrainingCourse } from "../types";

export const multiDog: TrainingCourse = {
    id: "multi_dog",
    title: "평화로운 다견 생활",
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
                    success_criteria: "각자 정해준 방석으로 3초 이내에 기쁘게 올라감",
                    alternatives: [
                        {
                            id: "B",
                            title: "'높이가 다른' 휴식처 제공",
                            description: "바닥 방석에서 서로 싸운다면, 한 아이는 소파 위, 한 아이는 바닥 방석으로 높낮이를 다르게 설정하세요. 영역 구분이 훨씬 명확해집니다."
                        }
                    ]
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
                    success_criteria: "A의 이름을 부를 때 B가 옆에서 침착하게 지켜함",
                    alternatives: [
                        {
                            id: "B",
                            title: "'주먹 쥔 손' 활용 대기",
                            description: "끼어드는 아이가 있다면, 간식을 쥔 주먹을 보여주고 기다리는 아이에게만 손을 펴서 주세요. 주먹 쥔 손은 '참아야 한다'는 시각적 신호가 됩니다."
                        }
                    ]
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
                    success_criteria: "식사 직후 상대 그릇 쪽으로 가지 않고 보호자에게 복귀",
                    alternatives: [
                        {
                            id: "B",
                            title: "'다 먹은 그릇' 즉시 회수",
                            description: "식사 후 싸움이 난다면, 다 먹은 아이를 즉시 다른 방으로 분리하고 그릇을 바로 치우세요. '빈 그릇을 지킬 이유' 자체를 없앱니다."
                        }
                    ]
                },
                {
                    step_number: 3,
                    title: "나란히 앉아 식사 기다리기",
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
                    success_criteria: "상대방의 존재를 의식하면서도 편안한 발걸음 유지",
                    alternatives: [
                        {
                            id: "B",
                            title: "'다른 가족'과 따로 출발해서 만나기",
                            description: "같이 나가면 흥분한다면, 5분 간격으로 따로 집을 나선 뒤 공원 특정 지점에서 만나 나란히 걷기를 시작하세요. 문을 나설 때의 경쟁심을 원천 차단합니다."
                        }
                    ]
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
};
