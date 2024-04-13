"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";


export function UpdatePoints() {
    const updatePoints = api.admin.updateBetPointsByMatchId.useMutation({
        onSuccess: () => {
        },
    });

    return (
        <div>
            <Button type="button" onClick={() => updatePoints.mutate({
                matchId: 6
            })}>Update points</Button>

        </div>

    )
}