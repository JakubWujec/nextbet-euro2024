import { db } from "../db";
import { deleteMockUsersAndBets } from "../queries/seed-queries";


async function main() {
    await deleteMockUsersAndBets();
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