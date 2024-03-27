import { updateMatchSchema, updateMatchScoreSchema } from "@/schema/match.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { add, formatISO, startOfDay } from "date-fns";
import { z } from "zod";

export const matchRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ homeTeamId: z.number(), awayTeamId: z.number(), startDate: z.string() }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.match.create({
        data: {
          homeTeamId: input.homeTeamId,
          awayTeamId: input.awayTeamId,
          startDate: input.startDate
        },
      });
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
        console.log(error)
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
        console.log(error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Something went wrong"
        })
      }
    }),

  getListWithCurrentUserBets: publicProcedure
    .input(z.object({
      date: z.date().optional()
    }))
    .query(({ ctx, input }) => {
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

      return ctx.db.match.findMany({
        where: filters,
        include: {
          awayTeam: true,
          homeTeam: true,
          bets: {
            where: {
              userId: ctx.session?.user?.id
            }
          }
        }
      });
    }),

  getList: publicProcedure
    .input(z.object({
      date: z.date().optional()
    }))
    .query(({ ctx, input }) => {
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

      return ctx.db.match.findMany({
        where: filters,
        include: {
          awayTeam: true,
          homeTeam: true
        }
      });
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
