export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-full bg-brand-lime flex items-center justify-center text-xs">🐾</div>
                            <span className="text-lg font-bold text-white">TailLog</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs break-keep">
                            데이터와 AI로 만드는 과학적인 반려견 행동 수정.<br />
                            강아지와 보호자 사이의 올바른 소통을 돕습니다.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">제품</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-brand-lime transition-colors">기능 소개</a></li>
                            <li><a href="#" className="hover:text-brand-lime transition-colors">요금제</a></li>
                            <li><a href="#" className="hover:text-brand-lime transition-colors">성공 사례</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">지원</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-brand-lime transition-colors">자주 묻는 질문</a></li>
                            <li><a href="#" className="hover:text-brand-lime transition-colors">문의하기</a></li>
                            <li><a href="#" className="hover:text-brand-lime transition-colors">이용약관</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-xs text-center md:text-left">
                    &copy; {new Date().getFullYear()} TailLog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
