import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { changeNameSchema } from "@/schema/user.schema";

export const userRouter = createTRPCRouter({
    changeName: protectedProcedure.input(changeNameSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    name: input.name
                },
            });

            return {
                message: "Success",
                name: input.name
            }
        }),

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

    getList: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.team.findMany();
        }),

    getUserStats: publicProcedure
        .input(z.object({ userName: z.string() }))
        .query(async ({ ctx, input }) => {
            const findUser = await ctx.db.user.findFirst({
                where: {
                    name: input.userName
                }
            });
            if (!findUser) {
                throw new Error("User not exist")
            }

            const queryResult = await ctx.db.bet.groupBy({
                by: ['points'],
                _count: {
                    _all: true,
                },
                where: {
                    userId: findUser.id
                }
            })

            let count = queryResult.reduce((a, b) => a + b._count._all, 0);
            let points = queryResult.reduce((a, b) => a + b.points * b._count._all, 0);
            let correctWinner = queryResult.find(x => x.points === 2)?._count._all ?? 0;
            let correctScore = queryResult.find(x => x.points === 5)?._count._all ?? 0;


            return {
                points: points,
                count: count,
                correctScore: correctScore,
                correctWinner: correctWinner
            }
        }),
});
