"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";


export function RunMocks() {
    const runMocks = api.admin.runMocks.useMutation();

    return (
        <div>
            <Button type="button" onClick={() => runMocks.mutate()}>Run mocks</Button>
        </div >
    )
}