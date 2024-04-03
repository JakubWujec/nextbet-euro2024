"use client"

import { Team } from "@/app/teams/columns"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Match = {
    id: number
    startDate: Date
    homeTeam: Team,
    awayTeam: Team,
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
