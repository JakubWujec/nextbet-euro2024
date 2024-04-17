import { db } from "../db";

async function main() {
    const matchIds = await db.match.findMany({ select: { id: true } });
    for (let row of matchIds) {
        await db.match.update({
            where: {
                id: row.id
            },
            data: {
                homeTeamScore: Math.floor(Math.random() * 9),
                awayTeamScore: Math.floor(Math.random() * 9)
            },

        })
    }

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