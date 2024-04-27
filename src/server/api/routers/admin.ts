import {
  createTRPCRouter,
  protectedProcedure
} from "@/server/api/trpc";
import { calculatePointsQuery } from "@/server/queries/calculate-points";
import { updateLastStandingsUpdateDate } from "@/server/queries/system";

export const adminRouter = createTRPCRouter({
  updateAllPoints: protectedProcedure.mutation(async ({ }) => {
    await calculatePointsQuery();
    await updateLastStandingsUpdateDate();
  }),
});
