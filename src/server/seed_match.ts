import { match } from "assert";
import { db } from "./db";
import fixtures from "./euro_2024_fixtures";

async function main() {
    let teams = await db.team.findMany({});

    let group_matches_data = fixtures.map((match_row) => {
        return {
            homeTeamId: teams.find((team => team.name === match_row.HomeTeam))?.id ?? 1,
            awayTeamId: teams.find((team => team.name === match_row.AwayTeam))?.id ?? 1,
            startDate: new Date(match_row.DateUtc),
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