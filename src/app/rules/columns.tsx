
import { ScoringRule } from "@/server/queries/scoring"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<ScoringRule[]>[] = [
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "points",
        header: "Points",
    },

]
