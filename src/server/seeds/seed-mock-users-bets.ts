import { db } from "../db";

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



seedMockUsersBets()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });

export default seedMockUsersBets;