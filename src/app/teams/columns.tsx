"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = {
    id: number
    name: string;
    code: string;
}

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Team Name",
    },
    {
        accessorKey: "code",
        header: "TeamCode",
    },
]
