import { db } from "../db";
import { seedMockUsers } from "../queries/seed-queries";


async function main() {
    await seedMockUsers();
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