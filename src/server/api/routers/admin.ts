import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "@/server/api/trpc";
import { calculatePointsQuery } from "@/server/queries/calculate-points";
import { getLastStandingsUpdateDate, updateLastStandingsUpdateDate } from "@/server/queries/system";

export const adminRouter = createTRPCRouter({
  updateAllPoints: protectedProcedure.mutation(async ({ ctx, input }) => {
    await calculatePointsQuery();
    await updateLastStandingsUpdateDate();
  }),
});
