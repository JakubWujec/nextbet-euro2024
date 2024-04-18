import { db } from "../db";

export async function calculatePointsQuery() {
    await db.$queryRaw`
        UPDATE "Bet"
        SET "points" = 
            (CASE 
                WHEN "Match"."homeTeamScore" = "Bet"."homeTeamScore" 
                AND "Match"."awayTeamScore" = "Bet"."awayTeamScore" 
                THEN 5
                WHEN sign("Match"."homeTeamScore" - "Match"."awayTeamScore") = sign("Bet"."homeTeamScore" - "Bet"."awayTeamScore")
                THEN 2
                ELSE 0 
            END)
        FROM "Match"
        WHERE "Match"."id" = "Bet"."matchId";
    `
}