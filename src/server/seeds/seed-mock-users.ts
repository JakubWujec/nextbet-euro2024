import { db } from "../db";

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
seedMockUsers()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });

export default seedMockUsers;