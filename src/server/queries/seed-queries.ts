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

async function seedMockUsers() {
    await db.user.createMany({
        data: [
            { name: "Mock_John123" },
            { name: "Mock_Mike2004" },
            { name: "Mock_Rambo12" },
            { name: "Mock_Philip" },
            { name: "Mock_Jane" },
            { name: "Mock_Wilfred" },
            { name: "Mock_Pius" },
        ]
    })
}

async function seedMockUsersBets() {
    const mockUsers = await db.user.findMany({
        where: {
            name: {
                startsWith: 'Mock'
            }
        }
    });

    const matchIds = await db.match.findMany({ select: { id: true } });

    for (const userRow of mockUsers) {
        for (const matchRow of matchIds) {
            await db.bet.upsert({
                where: {
                    matchId_userId: {
                        matchId: matchRow.id,
                        userId: userRow.id,
                    }
                },
                create: {
                    matchId: matchRow.id,
                    userId: userRow.id,
                    homeTeamScore: Math.floor(Math.random() * 9),
                    awayTeamScore: Math.floor(Math.random() * 9)
                },
                update: {
                    matchId: matchRow.id,
                    userId: userRow.id,
                    homeTeamScore: Math.floor(Math.random() * 9),
                    awayTeamScore: Math.floor(Math.random() * 9)
                }
            })
        }


    }
}

async function deleteMockUsersAndBets() {
    const mockUsers = await db.user.deleteMany({
        where: {
            name: {
                startsWith: 'Mock'
            }
        }
    });
}

export {
    seedTeams,
    seedMatches,
    seedMockUsers,
    seedMockUsersBets,
    deleteMockUsersAndBets
}