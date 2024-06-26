"use client";

import { DataTable } from "@/components/ui/data-table";
import { api } from "@/trpc/react";
import { columns } from "@/app/admin/matches/columns"

export function ListMatch() {
    const { data: matches, isLoading } = api.match.getList.useQuery({});

    return (
        <DataTable columns={columns} data={matches ?? []} />
    )
}