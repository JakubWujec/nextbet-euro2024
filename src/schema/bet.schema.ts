import { AppRouter } from '@/server/api/root';
import type { inferRouterOutputs } from '@trpc/server';
import z from 'zod';
type RouterOutput = inferRouterOutputs<AppRouter>;

export const createBetSchema = z.object({
    matchId: z.coerce.number(),
    homeTeamScore: z.coerce.number().nonnegative(),
    awayTeamScore: z.coerce.number().nonnegative(),
})


export type GetMatchBetStatsOutput = RouterOutput['bet']['getMatchBetStats'];

export type CreateBetInput = z.TypeOf<typeof createBetSchema>