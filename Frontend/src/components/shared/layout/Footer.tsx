export function Footer() {
    return (
        <footer className="bg-gray-900 pt-20 pb-10 text-gray-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6 cursor-default">
                            <div className="w-8 h-8 rounded-lg bg-brand-lime flex items-center justify-center">
                                <span className="text-white">🐾</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight font-outfit">TailLog</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-sm break-keep leading-relaxed text-sm">
                            TailLog은 데이터를 통해 반려견의 행동을 깊이 있게 이해하고,
                            보호자와 아이가 더 행복한 삶을 살 수 있도록 돕는 솔루션입니다.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm">서비스</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="/about" className="hover:text-brand-lime transition-colors">서비스 소개</a></li>
                            <li><a href="/pricing" className="hover:text-brand-lime transition-colors">요금제</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm">고객지원</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="/faq" className="hover:text-brand-lime transition-colors">자주 묻는 질문</a></li>
                            <li><a href="/contact" className="hover:text-brand-lime transition-colors">1:1 문의</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm">법적 고지</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="/privacy" className="hover:text-brand-lime transition-colors">개인정보 처리방침</a></li>
                            <li><a href="/terms" className="hover:text-brand-lime transition-colors">이용 약관</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs font-mono tracking-tighter">
                        © 2026 TailLog AI Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {/* Social Icons Placeholder */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
