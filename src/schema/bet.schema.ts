import z from 'zod';


export const createBetSchema = z.object({
    matchId: z.coerce.number(),
    homeTeamScore: z.coerce.number().nonnegative(),
    awayTeamScore: z.coerce.number().nonnegative(),
})


export type CreateBetInput = z.TypeOf<typeof createBetSchema>