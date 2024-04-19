import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

const createBetSchema = z.object({
    matchId: z.number(),
    homeTeamScore: z.number().nonnegative(),
    awayTeamScore: z.number().nonnegative()
})


export const betRouter = createTRPCRouter({
    getUserBetList: publicProcedure
        .query(({ ctx }) => {
            if (!ctx.session?.user?.id) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Can not create a bet while logged out',
                })
            }

            return ctx.db.bet.findMany({
                where: {
                    placedBy: ctx.session.user
                },
                include: {
                    onMatch: {
                        include: {
                            homeTeam: true,
                            awayTeam: true,
                        }
                    }
                }
            });
        }),

    createOrUpdate: publicProcedure
        .input(createBetSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                if (!ctx.session?.user?.id) {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'Can not create a bet while logged out',
                    })
                } else {

                    const savedBet = await ctx.db.bet.upsert({
                        where: {
                            matchId_userId: {
                                matchId: input.matchId,
                                userId: ctx.session.user.id,
                            }

                        },
                        update: { ...input, userId: ctx.session.user.id },
                        create: { ...input, userId: ctx.session.user.id },
                    })

                    return savedBet
                }


            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: "Something went wrong"
                })
            }
        }),

    getMatchBetStats: publicProcedure
        .input(z.object({
            matchId: z.number().nonnegative(),
        }))
        .query(async ({ ctx, input }) => {
            const match = await ctx.db.match.findUniqueOrThrow({
                where: {
                    id: input.matchId
                }
            })

            const aggregate = await ctx.db.bet.groupBy({
                by: ['homeTeamScore', 'awayTeamScore', 'points'],
                _count: {
                    _all: true,
                },
                where: {
                    matchId: input.matchId
                },
                orderBy: {
                    points: 'desc',
                },
            })

            const count = aggregate.map(x => x._count._all).reduce((a, b) => a + b, 0);

            return {
                match,
                stats: aggregate,
                count,
            };

        })

});

