import { match } from "assert";
import { db } from "./db";
import fixtures from "./euro_2024_fixtures";
import { Stage } from "@prisma/client";

async function main() {
    let teams = await db.team.findMany({});

    let group_matches_data = fixtures.filter((match_row) => match_row.RoundNumber <= 3).map((match_row) => {
        if (!teams.find((team => team.name === match_row.HomeTeam))) throw new Error(`NO ${match_row.HomeTeam}`)
        if (!teams.find((team => team.name === match_row.AwayTeam))) throw new Error(`NO ${match_row.AwayTeam}`)
        let startDate = new Date(match_row.DateUtc);
        let stage = match_row.RoundNumber === 1 ? Stage.G1 : match_row.RoundNumber === 2 ? Stage.G2 : Stage.G3
        return {
            homeTeamId: teams.find((team => team.name === match_row.HomeTeam))?.id ?? 1,
            awayTeamId: teams.find((team => team.name === match_row.AwayTeam))?.id ?? 1,
            startDate: startDate,
            stage: stage
        }
    })

    const matches = await db.match.createMany({
        data: group_matches_data
    });
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