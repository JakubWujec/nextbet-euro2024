
import { Standing } from "@/schema/standing.schema";
import {
    createTRPCRouter,
    publicProcedure
} from "@/server/api/trpc";
import { getLastStandingsUpdateDate } from "@/server/queries/system";

export const standingRouter = createTRPCRouter({
    getList: publicProcedure
        .query(async ({ ctx }) => {
            const lastUpdated = await getLastStandingsUpdateDate();
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

            return {
                lastUpdated: lastUpdated,
                standings: standings as Standing[]
            }

        }),
});
