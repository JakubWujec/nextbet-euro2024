// https://create.t3.gg/en/usage/trpc#sample-integration-test



import { createCaller } from "@/server/api/root"
import { createInnerTRPCContext } from "@/server/api/trpc";
import { expect, test } from "vitest";

test("example router", async () => {
    const ctx = createInnerTRPCContext({
        session: {
            user: { id: "123", name: "John Doe", role: "USER" },
            expires: "1",
        },
    });

    const caller = createCaller({
        ...ctx,
        headers: new Headers()
    });

    const example = await caller.standings.getList();

    expect(example).toHaveProperty('lastUpdated');
    expect(example).toHaveProperty('standings');

});