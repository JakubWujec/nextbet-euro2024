import { createMatchSchema, updateMatchSchema, updateMatchScoreSchema } from "@/schema/match.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Prisma, Stage } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { add, formatISO, startOfDay } from "date-fns";
import { z } from "zod";

export const matchRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createMatchSchema)
    .mutation(async ({ ctx, input }) => {

      return ctx.db.match.create({
        data: {
          homeTeamId: input.homeTeamId,
          awayTeamId: input.awayTeamId,
          stage: input.stage,
          startDate: input.startDate
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {

      let removeBets = await ctx.db.bet.deleteMany({
        where: {
          matchId: input.id
        }
      })

      let match = await ctx.db.match.delete({
        where: {
          id: input.id
        }
      })

      return {
        message: "Deleted",
        data: match
      }

    }),

  update: publicProcedure
    .input(updateMatchSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const findMatch = await ctx.db.match.findUniqueOrThrow({
          where: {
            id: input.matchId
          }
        })

        const updatedMatch = await ctx.db.match.update({
          where: {
            id: findMatch.id
          },
          data: {
            homeTeamId: input.homeTeamId,
            awayTeamId: input.awayTeamId,
            startDate: input.startDate,
            homeTeamScore: input.homeTeamScore,
            awayTeamScore: input.awayTeamScore,
            finished: input.finished,
          }
        })

        return updatedMatch
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Something went wrong"
        })
      }
    }),

  updateScore: publicProcedure
    .input(updateMatchScoreSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const findMatch = await ctx.db.match.findUniqueOrThrow({
          where: {
            id: input.matchId
          }
        })

        const updatedMatch = await ctx.db.match.update({
          where: {
            id: findMatch.id
          },
          data: {
            homeTeamScore: input.homeTeamScore,
            awayTeamScore: input.awayTeamScore,
          }
        })

        return updatedMatch

      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Something went wrong"
        })
      }
    }),

  myBets: protectedProcedure
    .input(z.object({
      date: z.date().optional(),
      stage: z.nativeEnum(Stage).optional()
    }))
    .query(({ ctx, input }) => {
      const userId = ctx.session.user.id
      const filters: Prisma.MatchWhereInput = {};

      if (input.date) {
        const gte = formatISO(startOfDay(input.date));
        const lt = formatISO(add(gte, {
          days: 1
        }))
        filters.startDate = {
          gte,
          lt
        }
      }

      if (input.stage) {
        filters.stage = input.stage
      }

      return ctx.db.match.findMany({
        where: filters,
        include: {
          awayTeam: true,
          homeTeam: true,
          bets: {
            where: {
              userId: userId
            }
          }
        }
      });
    }),

  getListWithUserBetsThatHaveStartedAlready: publicProcedure
    .input(z.object({
      userName: z.string()
    })).query(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Can not create a bet while logged out',
        })
      }
      const name = decodeURI(input.userName)

      const user = await ctx.db.user.findFirst({
        where: {
          name: name
        }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User not exist. Name ${name}`,
        })
      }

      return ctx.db.match.findMany({
        where: {
          startDate: {
            lt: new Date()
          }
        },
        include: {
          awayTeam: true,
          homeTeam: true,
          bets: {
            where: {
              userId: user.id
            }
          }
        }
      });
    }),

  getList: publicProcedure
    .input(z.object({
      date: z.date().optional(),
      page: z.number().default(1),
      pageSize: z.number().default(10)
    }))
    .query(async ({ ctx, input }) => {
      const filters: Prisma.MatchWhereInput = {};

      if (input.date) {
        const gte = formatISO(startOfDay(input.date));
        const lt = formatISO(add(gte, {
          days: 1
        }))
        filters.startDate = {
          gte,
          lt
        }
      }

      let skip = (input.page - 1) * input.pageSize

      let result = await ctx.db.match.findMany({
        where: filters,
        include: {
          awayTeam: true,
          homeTeam: true
        },
        skip: skip,
        take: input.pageSize,
        orderBy: {
          startDate: 'desc'
        }
      });

      return result;
    }),

  getOne: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.match.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          awayTeam: true,
          homeTeam: true
        }
      });
    }),
});
