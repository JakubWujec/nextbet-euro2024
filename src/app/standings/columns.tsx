"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Standing = {
    id: number
    name: string;
    overallPoints: number,
    rank: number,
}

export const columns: ColumnDef<Standing>[] = [
    {
        accessorKey: "rank",
        header: "Rank",
    },
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "User",
    },
    {
        accessorKey: "overallPoints",
        header: "Points",
    },
]
