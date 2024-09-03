import { inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { amazonRouter } from "./amazon";

export const appRouter = router({
    amazon : amazonRouter
})

export type AppRouter = typeof appRouter;
export type AppRouterType = inferRouterOutputs<AppRouter>