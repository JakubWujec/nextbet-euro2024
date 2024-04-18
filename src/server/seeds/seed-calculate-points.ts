import { db } from "../db";
import { calculatePointsQuery } from "../queries/calculate-points";


async function main() {
    await calculatePointsQuery();
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