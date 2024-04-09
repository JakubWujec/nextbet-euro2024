"use client"

import { Team } from "@/app/teams/columns"
import { Stage } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Match = {
    id: number
    startDate: Date
    homeTeam: Team,
    awayTeam: Team,
    stage: Stage,
}

export const columns: ColumnDef<Match>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "homeTeam.code",
        header: "Home Team",
    },
    {
        accessorKey: "awayTeam.code",
        header: "Away Team",
    },
    {
        accessorKey: "stage",
        header: "Stage",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        header: "Start Date",
        accessorFn: (row) => {
            return format(row.startDate, "dd/mm/yyyy HH:mm")
        }
    },
    {
        accessorKey: "homeTeamScore",
        header: "Home Team Score",
    },
    {
        accessorKey: "awayTeamScore",
        header: "Away Team Score",
    },
]
