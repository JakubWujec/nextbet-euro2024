import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const teamRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(3), code: z.string().min(3) }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.team.create({
        data: {
          code: input.code,
          name: input.name,
        },
      });
    }),
});
