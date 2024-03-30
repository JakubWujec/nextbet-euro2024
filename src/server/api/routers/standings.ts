import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { Standing } from "@/schema/standing.schema";

export const standingRouter = createTRPCRouter({
    getList: publicProcedure
        .query(async ({ ctx }) => {
            const standings = await ctx.db.$queryRaw`
                SELECT 
                    "User"."name" as name, 
                    "T_rank"."sum_points" as "points",
                    RANK () OVER ( 
                        ORDER BY "T_rank"."sum_points" DESC
                    ) "rank" 
                FROM "User"
                JOIN (
                    SELECT "Bet"."userId" AS "userId", SUM("Bet"."points") AS "sum_points" 
                    FROM "Bet"
                    GROUP BY "userId"
                ) "T_rank" on "T_rank"."userId" = "User"."id"
            `
            return standings as Standing[]
        }),
});
