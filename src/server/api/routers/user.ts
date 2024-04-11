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
});
