import { db } from "../db";

async function main() {
    let result = await db.$queryRaw`
    UPDATE "Match"
        set "startDate" = "startDate" - interval '2 months'
`

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