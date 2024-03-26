import z from 'zod'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/server/api/root';


export const createMatchSchema = z.object({
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  startDate: z.date()
})

export const updateMatchSchema = z.object({
  matchId: z.number(),
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  startDate: z.date(),
  homeTeamScore: z.number().nonnegative().optional(),
  awayTeamScore: z.number().nonnegative().optional(),
  finished: z.boolean()
})

export const getSingleMatchSchema = z.object({
  matchId: z.number(),
})

type RouterOutput = inferRouterOutputs<AppRouter>;

export type GetListWithCurrentUserBetsOutput = RouterOutput['match']['getListWithCurrentUserBets'];  

export type CreateMatchInput = z.TypeOf<typeof createMatchSchema>

export type UpdateMatchInput = z.TypeOf<typeof updateMatchSchema>