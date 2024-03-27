"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Team} from "@/app/teams/columns"
import { EditMatchDialog } from "../admin/matches/edit-match-dialog"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Match = {
    id: number
    startDate: Date
    homeTeam: Team,
    awayTeam: Team,
}
const columnHelper = createColumnHelper<Match>()

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
    columnHelper.display({
        id: 'actions',
        cell: props => {
            return (
                <EditMatchDialog matchId={props.row.getValue("id")}></EditMatchDialog>
            )
        },
    }),
]
