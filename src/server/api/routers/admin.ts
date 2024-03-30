import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
    updateBetPointsByMatchId: protectedProcedure
        .input(z.object({ matchId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            // for every bet on this match update points column;
            let result = await ctx.db.$queryRaw`
            UPDATE "Bet"
              set "points" = 
                (CASE 
                when "Match"."homeTeamScore" = "Bet"."homeTeamScore" 
                AND "Match"."awayTeamScore" = "Bet"."awayTeamScore" 
                THEN 5
                when sign("Match"."homeTeamScore" - "Match"."awayTeamScore") = sign("Bet"."homeTeamScore" - "Bet"."awayTeamScore")
                THEN 2
                else 1 END)
            FROM 
              "Bet" as "BetAlias"
              INNER JOIN 
              "Match" ON "Match"."id" = "BetAlias"."matchId" AND "BetAlias"."matchId" = ${input.matchId}
            WHERE "Bet"."matchId" = ${input.matchId}
            `
            return result;
        }),
});
