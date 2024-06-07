import {
  createTRPCRouter,
  protectedProcedure
} from "@/server/api/trpc";
import { calculatePointsQuery } from "@/server/queries/calculate-points";
import { deleteMockUsersAndBets, seedMockUsersBets, seedMockUsers } from "@/server/queries/seed-queries";
import { updateLastStandingsUpdateDate } from "@/server/queries/system";

export const adminRouter = createTRPCRouter({
  updateAllPoints: protectedProcedure.mutation(async ({ }) => {
    await calculatePointsQuery();
    await updateLastStandingsUpdateDate();
  }),
  runMocks: protectedProcedure.mutation(async ({ }) => {
    await seedMockUsers()
    await seedMockUsersBets();
  }),
  deleteMockUsersAndBets: protectedProcedure.mutation(async ({ }) => {
    await deleteMockUsersAndBets();
  })
});
