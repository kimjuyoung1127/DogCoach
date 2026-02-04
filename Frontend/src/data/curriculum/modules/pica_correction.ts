import { Trash2, Sparkles, HeartHandshake, Dog, Flag } from "lucide-react";
import { TrainingCourse } from "../types";

export const picaCorrection: TrainingCourse = {
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
                    success_criteria: "간식을 보면 스스로 입을 벌려 물건을 툭 떨어뜨림",
                    alternatives: [
                        {
                            id: "B",
                            title: "'간식 길' 만들기 (Trail)",
                            description: "입에 문 것을 뺏으려 할 때 도망간다면, 입에 있는 걸 뱉으라고 요구하지 마세요. 강아지 발 밑부터 보호자 쪽으로 간식을 줄지어 뿌려주세요. 간식을 먹으려다 자연스럽게 입에 든 것을 떨어뜨리게 유도합니다."
                        }
                    ]
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
};
