import { Stage } from "@prisma/client";
import { db } from "../db";
import fixtures from "../data/euro_2024_fixtures";

async function seedTeams() {
    await db.team.createMany({
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

async function seedMatches() {
    const teams = await db.team.findMany({});

    const group_matches_data = fixtures.filter((match_row) => match_row.RoundNumber <= 3).map((match_row) => {
        if (!teams.find((team => team.name === match_row.HomeTeam))) throw new Error(`NO ${match_row.HomeTeam}`)
        if (!teams.find((team => team.name === match_row.AwayTeam))) throw new Error(`NO ${match_row.AwayTeam}`)
        const startDate = new Date(match_row.DateUtc);
        const stage = match_row.RoundNumber === 1 ? Stage.G1 : match_row.RoundNumber === 2 ? Stage.G2 : Stage.G3
        return {
            homeTeamId: teams.find((team => team.name === match_row.HomeTeam))?.id ?? 1,
            awayTeamId: teams.find((team => team.name === match_row.AwayTeam))?.id ?? 1,
            startDate: startDate,
            stage: stage
        }
    })

    await db.match.createMany({
        data: group_matches_data
    });
}

export {
    seedTeams,
    seedMatches
}