"use client";

import { api } from "@/trpc/react";

export function ListTeam() {

    const { data: teams, isLoading } = api.team.getList.useQuery();
    
    return (
        <div>
            Tu będzie lista teamsow.
        </div>
    )
}