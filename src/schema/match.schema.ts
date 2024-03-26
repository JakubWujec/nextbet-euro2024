import z from 'zod'


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

export type CreateMatchInput = z.TypeOf<typeof createMatchSchema>

export type UpdateMatchInput = z.TypeOf<typeof updateMatchSchema>