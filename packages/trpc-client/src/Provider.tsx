"use client"

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { trpcClient as trpc } from "./client"

export const TRPCProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({
                url: process.env.NEXT_PUBLIC_TRPC_URL!,
            })]
        })
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}