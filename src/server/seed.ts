import { db } from "./db";

async function main() {
    const clearTeams = await db.team.deleteMany();

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
            { name: 'Slovakia', code: 'SLO' },
            { name: 'Belgium', code: 'BEL' },
            { name: 'Romania', code: 'ROM' },
            { name: 'Ukraine', code: 'UKR' },
            { name: 'Türkiye', code: 'TUR' },
            { name: 'Portugal', code: 'POR' },
            { name: 'Czechia', code: 'CZE' },
            { name: 'Georgia', code: 'GEO' },
        ]
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