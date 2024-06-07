import {
  createTRPCRouter,
  protectedProcedure
} from "@/server/api/trpc";
import { calculatePointsQuery } from "@/server/queries/calculate-points";
import { updateLastStandingsUpdateDate } from "@/server/queries/system";
import seedMockUsers from "@/server/seeds/seed-mock-users";
import seedMockUsersBets from "@/server/seeds/seed-mock-users-bets";

export const adminRouter = createTRPCRouter({
  updateAllPoints: protectedProcedure.mutation(async ({ }) => {
    await calculatePointsQuery();
    await updateLastStandingsUpdateDate();
  }),
  runMocks: protectedProcedure.mutation(async ({ }) => {
    await seedMockUsers()
    await seedMockUsersBets();
  }),
});
