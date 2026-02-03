"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "김민수 보호자님",
        dogName: "초코",
        role: "분리불안 해결",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content: "테일로그 덕분에 우리 초코가 왜 짖는지 정확히 알게 되었어요. 데이터를 보니 제가 자리를 비울 때가 아니라, 현관문 밖 소음에 반응한다는 걸 발견했죠. 이제는 맞춤 훈련으로 훨씬 평온해졌습니다.",
        rating: 5,
    },
    {
        name: "이지은 보호자님",
        dogName: "구름이",
        role: "입질 행동 교정",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "병원에서도 특별한 원인을 모르겠다고 했는데, 테일로그의 행동 분포도를 보고 규칙적인 에너지 소모가 부족하다는 걸 깨달았습니다. 산책 시간을 조정하고 나서 입질이 거짓말처럼 사라졌어요.",
        rating: 5,
    },
    {
        name: "박준호 보호자님",
        dogName: "맥스",
        role: "산책 매너 개선",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        content: "훈련 리포트를 동물병원 선생님께 보여드렸더니 훨씬 더 정확한 상담이 가능했습니다. 말 못하는 맥스의 마음을 데이터로 통역받는 기분이에요. 정말 강추합니다!",
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 text-brand-lime text-sm font-bold mb-4"
                    >
                        <Star className="w-4 h-4 fill-current" />
                        <span>리얼 후기</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight break-keep">
                        이미 <span className="text-brand-lime font-outfit">5,000+</span> 보호자님들이<br />
                        아이들의 진심을 만났습니다
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full border-none shadow-xl shadow-gray-100 hover:shadow-2xl hover:shadow-brand-lime/5 transition-all duration-300 bg-orange-50/20">
                                <CardContent className="p-8 flex flex-col h-full">
                                    <Quote className="w-10 h-10 text-brand-lime/20 mb-4" />

                                    <p className="text-gray-700 leading-relaxed mb-8 break-keep flex-1 italic">
                                        "{item.content}"
                                    </p>

                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={item.image} alt={item.name} />
                                            <AvatarFallback>{item.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                                            <div className="text-gray-500 text-xs font-medium">
                                                {item.dogName} ({item.role})
                                            </div>
                                        </div>
                                        <div className="ml-auto flex gap-0.5">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 text-brand-orange fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
