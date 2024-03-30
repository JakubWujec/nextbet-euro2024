"use client"

import { Standing } from "@/schema/standing.schema"
import { ColumnDef } from "@tanstack/react-table"


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
