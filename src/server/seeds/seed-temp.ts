import { db } from "../db";

async function main() {
    let result = await db.$queryRaw`
    SELECT
        "Match"."homeTeamScore" as mh,
        "Match"."awayTeamScore" as ma,
        "Bet"."homeTeamScore" as bh,
        "Bet"."awayTeamScore" as ba,
        (CASE 
        when "Match"."homeTeamScore" = "Bet"."homeTeamScore" 
        AND "Match"."awayTeamScore" = "Bet"."awayTeamScore" 
        THEN 5
        when sign("Match"."homeTeamScore" - "Match"."awayTeamScore") = sign("Bet"."homeTeamScore" - "Bet"."awayTeamScore")
        THEN 2
        else 0 END) as calc_points,
        "Bet"."points"
    FROM 
    "Bet"
    INNER JOIN 
    "Match" ON "Match"."id" = "Bet"."matchId"
`
    console.log(result);

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