import { db } from "./db";

async function main() {
    const teamsA = await db.team.createMany({
        data: [
            { name: 'Germany', code: 'GER' },
            { name: 'Switzerland', code: 'SWI' },
            { name: 'Scotland', code: 'SCO' },
            { name: 'Hungary', code: 'HUN' },
        ]
    });

    const matches = await db.match.createMany({
        data: [
            { startDate: new Date(), homeTeamId: 1, awayTeamId: 2 },
            { startDate: new Date(), homeTeamId: 3, awayTeamId: 4 },
            { startDate: new Date(), homeTeamId: 3, awayTeamId: 1 },
            { startDate: new Date(), homeTeamId: 2, awayTeamId: 4 },
            { startDate: new Date(), homeTeamId: 4, awayTeamId: 1 },
            { startDate: new Date(), homeTeamId: 2, awayTeamId: 3 },]
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