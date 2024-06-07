"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export function DeleteMocks() {
    const deleteMocks = api.admin.deleteMockUsersAndBets.useMutation();

    return (
        <div>
            <Button type="button" onClick={() => deleteMocks.mutate()}>Delete mocks</Button>
        </div >
    )
}