"use client"

import { GetMatchBetStatsOutput } from "@/schema/bet.schema"
import { Standing } from "@/schema/standing.schema"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<GetMatchBetStatsOutput['stats'][0]>[] = [
    {
        accessorFn: row => `${row.homeTeamScore} : ${row.awayTeamScore}`,
        header: "Bet",
    },
    {
        accessorKey: "points",
        header: "Points",
    },
    {
        accessorKey: "_count._all",
        header: "Count",
    },

]
