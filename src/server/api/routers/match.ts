import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const matchRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ homeTeamId: z.number(), awayTeamId: z.number(), startDate: z.string()}))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.match.create({
        data: {
          homeTeamId: input.homeTeamId,
          awayTeamId: input.awayTeamId,
          startDate: input.startDate
        },
      });
    }),
});
