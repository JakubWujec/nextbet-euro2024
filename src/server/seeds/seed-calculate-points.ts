import { db } from "../db";

async function main() {
    let result = await db.$queryRaw`
        UPDATE "Bet"
        set "points" = 
            (CASE 
            when "Match"."homeTeamScore" = "Bet"."homeTeamScore" 
            AND "Match"."awayTeamScore" = "Bet"."awayTeamScore" 
            THEN 5
            when sign("Match"."homeTeamScore" - "Match"."awayTeamScore") = sign("Bet"."homeTeamScore" - "Bet"."awayTeamScore")
            THEN 2
            else 0 END)
        FROM 
        "Bet" as "BetAlias"
        INNER JOIN 
        "Match" ON "Match"."id" = "BetAlias"."matchId"
    `

}
main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });

export default main;