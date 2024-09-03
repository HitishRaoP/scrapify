import { AppRouter } from "@scrapify/trpc-server/src/routers";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: process.env.NEXT_PUBLIC_TRPC_URL!,
        })
    ]
})