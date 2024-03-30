"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Standing = {
    rank: number,
    name: string;
    points: number,
}

export const columns: ColumnDef<Standing>[] = [
    {
        accessorKey: "rank",
        header: "Rank",
    },
    {
        accessorKey: "name",
        header: "User",
    },
    {
        accessorKey: "points",
        header: "Points",
    },
]
