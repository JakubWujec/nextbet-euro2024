"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";


export function UpdatePoints() {
    const updatePoints = api.admin.updateAllPoints.useMutation();

    return (
        <div>
            <Button type="button" onClick={() => updatePoints.mutate()}> Update points</Button>

        </div >

    )
}