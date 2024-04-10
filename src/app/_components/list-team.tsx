"use client";

import { DataTable } from "@/components/ui/data-table";
import { api } from "@/trpc/react";
import { Team, columns } from "@/app/admin/teams/columns"

export function ListTeam() {
    const { data: teams, isLoading } = api.team.getList.useQuery<Team[]>();

    return (
        <DataTable columns={columns} data={teams ?? []} />
    )
}