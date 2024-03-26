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
        console.log(error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Something went wrong"
        })
      }
    })
  
    
  });
  