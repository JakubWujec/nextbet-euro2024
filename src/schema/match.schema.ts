import z from 'zod'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/server/api/root';
import { Bet, Match, Team, Stage } from '@prisma/client';


export const createMatchSchema = z.object({
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  stage: z.nativeEnum(Stage).default("G1"),
  startDate: z.date()
})

export const updateMatchSchema = z.object({
  matchId: z.number(),
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  startDate: z.date(),
  homeTeamScore: z.coerce.number().nonnegative().optional(),
  awayTeamScore: z.coerce.number().nonnegative().optional(),
  finished: z.boolean()
})

export const updateMatchScoreSchema = z.object({
  matchId: z.number(),
  homeTeamScore: z.coerce.number().nonnegative(),
  awayTeamScore: z.coerce.number().nonnegative(),
})

export const getSingleMatchSchema = z.object({
  matchId: z.number(),
})

type RouterOutput = inferRouterOutputs<AppRouter>;

export type GetOneMatchOutput = RouterOutput['match']['getOne']

export type GetListWithCurrentUserBetsOutput = RouterOutput['match']['myBets'];

export type MatchWithBet = ({
  awayTeam: Team;
  homeTeam: Team;
  bets: Bet[];
} & Match)

export type CreateMatchInput = z.TypeOf<typeof createMatchSchema>

export type UpdateMatchInput = z.TypeOf<typeof updateMatchSchema>

export type UpdateMatchScoreInput = z.TypeOf<typeof updateMatchScoreSchema>