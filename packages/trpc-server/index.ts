import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./src/routers";

export const trpcExpress = createExpressMiddleware({
    router: appRouter
})