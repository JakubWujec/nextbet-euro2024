import { db } from "./db";

async function main() {
    const teams = await db.team.createMany({
        data: [
            { name: 'Germany', code: 'GER' },
            { name: 'Switzerland', code: 'SWI' },
            { name: 'Scotland', code: 'SCO' },
            { name: 'Hungary', code: 'HUN' },
            { name: 'Spain', code: 'ESP' },
            { name: 'Croatia', code: 'CRO' },
            { name: 'Italy', code: 'ITA' },
            { name: 'Albania', code: 'ALB' },
            { name: 'Slovenia', code: 'SVN' },
            { name: 'Denmark', code: 'DEN' },
            { name: 'Serbia', code: 'SRB' },
            { name: 'England', code: 'ENG' },
            { name: 'Poland', code: 'POL' },
            { name: 'Netherlands', code: 'NED' },
            { name: 'Austria', code: 'AUT' },
            { name: 'France', code: 'FRA' },
            { name: 'Belgium', code: 'BEL' },
            { name: 'Slovakia', code: 'SLO' },
            { name: 'Romania', code: 'BEL' },
            { name: 'Ukraine', code: 'UKR' },
            { name: 'Turkiye', code: 'TUR' },
            { name: 'Portugal', code: 'POR' },
            { name: 'Czechia', code: 'CZE' },
            { name: 'Turkiye', code: 'TUR' },
            { name: 'Georgia', code: 'GEO' },
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