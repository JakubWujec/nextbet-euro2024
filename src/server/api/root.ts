import { teamRouter } from "@/server/api/routers/team";
import { matchRouter } from "@/server/api/routers/match";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { betRouter } from "./routers/bets";
import { standingRouter } from "./routers/standings";
import { adminRouter } from "./routers/admin";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  team: teamRouter,
  match: matchRouter,
  bet: betRouter,
  standings: standingRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
