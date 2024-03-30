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

export type GetListWithCurrentUserBetsOutput = RouterOutput['match']['getListWithCurrentUserBets'];

export type MatchWithBet = ({
  awayTeam: {
    id: number;
    name: string;
    code: string;
  };
  homeTeam: {
    id: number;
    name: string;
    code: string;
  };
  bets: {
    id: number;
    userId: string;
    matchId: number;
    homeTeamScore: number;
    points: number;
    awayTeamScore: number;
    createdAt: Date;
  }[];
} & {
  id: number;
  homeTeamId: number;
  homeTeamScore: number | null;
  awayTeamId: number;
  awayTeamScore: number | null;
  startDate: Date;
  finished: boolean;
})

export type CreateMatchInput = z.TypeOf<typeof createMatchSchema>

export type UpdateMatchInput = z.TypeOf<typeof updateMatchSchema>

export type UpdateMatchScoreInput = z.TypeOf<typeof updateMatchScoreSchema>