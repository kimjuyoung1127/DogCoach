"use client";

import { useEffect, useMemo, useState } from "react";

type LegalAction = "openPrivacy" | "openTerms";
type FooterLinkItem = { label: string; href?: string; action?: LegalAction };
type LegalDocType = "privacy" | "terms" | null;

const serviceLinks: FooterLinkItem[] = [
    { label: "서비스 소개", href: "/#service-intro" },
    { label: "요금제", href: "/#pricing" },
];

const supportLinks: FooterLinkItem[] = [
    { label: "자주 묻는 질문", href: "/#faq" },
    { label: "1:1 문의", href: "mailto:gmdqn2tp@gmail.com" },
];

const legalLinks: FooterLinkItem[] = [
    { label: "개인정보 처리방침", action: "openPrivacy" },
    { label: "이용약관", action: "openTerms" },
];

const legalCopy = {
    privacy: {
        title: "개인정보 처리방침 (임시 안내)",
        summary: "정식 개인정보 처리방침은 현재 작성 및 검토 중입니다.",
        body: "TailLog는 서비스 제공을 위해 필요한 최소한의 정보만 처리합니다. 현재 처리 항목(예: 계정 식별 정보, 서비스 이용 로그, 사용자가 직접 입력한 반려견/행동 기록)은 서비스 운영 및 기능 제공 목적 범위에서만 이용됩니다. 정식 처리방침에는 수집 항목, 이용 목적, 보관 기간, 파기 절차, 이용자 권리 행사 방법, 문의처를 포함해 공개할 예정입니다.",
    },
    terms: {
        title: "이용약관 (임시 안내)",
        summary: "정식 이용약관은 현재 작성 및 검토 중입니다.",
        body: "TailLog 이용 시 사용자는 관련 법령 및 서비스 운영 정책을 준수해야 하며, 서비스는 기능 개선 및 안정성 확보를 위해 변경될 수 있습니다. 정식 이용약관에는 서비스 제공 범위, 계정 관리 책임, 유료 서비스 조건, 면책 및 책임 제한, 분쟁 해결 절차를 포함해 공개할 예정입니다. 본 임시 안내는 요약 고지이며, 정식 약관/처리방침 게시 시 해당 문서가 우선 적용됩니다.",
    },
} as const;

export function Footer() {
    const [openLegal, setOpenLegal] = useState<LegalDocType>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpenLegal(null);
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    const modalContent = useMemo(() => {
        if (!openLegal) return null;
        return legalCopy[openLegal];
    }, [openLegal]);

    const handleLegalAction = (action?: LegalAction) => {
        if (!action) return;
        const next: LegalDocType = action === "openPrivacy" ? "privacy" : "terms";
        setOpenLegal((prev) => (prev === next ? null : next));
    };

    return (
        <>
            <footer className="bg-gray-900 pt-20 pb-10 text-gray-300">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-6 cursor-default">
                                <div className="w-8 h-8 rounded-lg bg-brand-lime flex items-center justify-center">
                                    <span className="text-white font-bold">TL</span>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight font-outfit">TailLog</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-sm break-keep leading-relaxed text-sm">
                                TailLog는 데이터로 반려견 행동 패턴을 이해하고, 보호자가 더 빠르게
                                맞춤 훈련 루틴을 실행할 수 있도록 돕는 서비스입니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm">서비스</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                {serviceLinks.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="hover:text-brand-lime transition-colors">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm">고객지원</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                {supportLinks.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="hover:text-brand-lime transition-colors">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm">법적 고지</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                {legalLinks.map((item) => (
                                    <li key={item.label}>
                                        <button
                                            type="button"
                                            onClick={() => handleLegalAction(item.action)}
                                            className="hover:text-brand-lime transition-colors text-left"
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-500 text-xs font-mono tracking-tighter">
                            © 2026 TailLog AI Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {openLegal && modalContent ? (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        aria-label="close legal notice"
                        onClick={() => setOpenLegal(null)}
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="legal-modal-title"
                        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
                    >
                        <h3 id="legal-modal-title" className="text-lg font-black text-gray-900 mb-2">
                            {modalContent.title}
                        </h3>
                        <p className="text-sm font-bold text-brand-lime mb-3">{modalContent.summary}</p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">{modalContent.body}</p>
                        <button
                            type="button"
                            onClick={() => setOpenLegal(null)}
                            className="w-full rounded-xl bg-gray-900 text-white font-bold py-3 hover:bg-black transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
