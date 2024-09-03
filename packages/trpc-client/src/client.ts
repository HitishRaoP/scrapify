import { createTRPCReact } from "@trpc/react-query"
import { AppRouter } from "@scrapify/trpc-server/src/routers"

export const trpcClient = createTRPCReact<AppRouter>();