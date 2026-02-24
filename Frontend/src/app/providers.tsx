/**
 * 클라이언트 사이드 Provider들을 모아놓은 컴포넌트입니다.
 * TanStack Query, Next-Themes, Auth Provider 등을 설정합니다.
 */
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
