import z from 'zod';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/server/api/root';
type RouterOutput = inferRouterOutputs<AppRouter>;

export const createBetSchema = z.object({
    matchId: z.coerce.number(),
    homeTeamScore: z.coerce.number().nonnegative(),
    awayTeamScore: z.coerce.number().nonnegative(),
})


export type GetMatchBetStatsOutput = RouterOutput['bet']['getMatchBetStats'];

export type CreateBetInput = z.TypeOf<typeof createBetSchema>