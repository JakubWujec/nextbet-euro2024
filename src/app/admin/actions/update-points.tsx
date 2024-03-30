"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";


export function UpdatePoints() {
    const updatePoints = api.admin.updateBetPointsByMatchId.useMutation({
        onSuccess: () => {
            console.log("HA")
        },
    });

    return (
        <div>
            <Button type="button" onClick={() => updatePoints.mutate({
                matchId: 1
            })}>Update points</Button>

        </div>

    )
}