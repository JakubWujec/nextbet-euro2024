import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";

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

  getList: publicProcedure
    .input(z.object({
      date: z.date().optional()
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.MatchWhereInput = {};

      if(input.date){
        const nextDate = new Date(input.date);
        nextDate.setDate(nextDate.getDate() + 1);
        filters.startDate = {
          gte: input.date.toISOString(),
          lt:  nextDate.toISOString()
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
});
