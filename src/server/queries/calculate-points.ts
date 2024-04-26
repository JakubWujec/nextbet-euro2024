import { db } from "../db";
import { EXACT_SCORE_RULE, CORRECT_WINNER_RULE } from "./scoring";


export async function calculatePointsQuery() {

    await db.$queryRaw`
        UPDATE "Bet"
        SET "points" = 
            (CASE 
                WHEN "Match"."homeTeamScore" = "Bet"."homeTeamScore" 
                AND "Match"."awayTeamScore" = "Bet"."awayTeamScore" 
                THEN ${EXACT_SCORE_RULE.points}
                WHEN sign("Match"."homeTeamScore" - "Match"."awayTeamScore") = sign("Bet"."homeTeamScore" - "Bet"."awayTeamScore")
                THEN ${CORRECT_WINNER_RULE.points}
                ELSE 0 
            END)
        FROM "Match"
        WHERE "Match"."id" = "Bet"."matchId";
    `
}