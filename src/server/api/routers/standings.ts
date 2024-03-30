import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";


const MOCK_DATA = [
    {
        id: 1,
        name: "John",
        overallPoints: 3,
        rank: 1
    },
    {
        id: 2,
        name: "Amy",
        overallPoints: 2,
        rank: 2
    }
]


export const standingRouter = createTRPCRouter({
    getList: publicProcedure
        .query(({ ctx }) => {
            return MOCK_DATA;
        }),
});
