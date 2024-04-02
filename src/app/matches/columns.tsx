"use client"

import { Team } from "@/app/teams/columns"
import { ColumnDef } from "@tanstack/react-table"
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
        accessorKey: "startDate",
        header: "Start Date",
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
