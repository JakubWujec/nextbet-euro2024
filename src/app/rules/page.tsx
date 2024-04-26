
import { DataTable } from "@/components/ui/data-table";
import { getScoringRules } from "@/server/queries/scoring";
import { ScoringRule } from "@/server/queries/scoring"
import { ColumnDef } from "@tanstack/react-table"


const scoringRules = await getScoringRules();

function Page() {

    return (
        <div className="sm:w-[80%] mx-auto">
            <h1 className="text-3xl font-semibold my-4">Rules</h1>
            <div>
                <p className="py-2">With every bet you get to earn points according to the table below.</p>
                <DataTable
                    columns={columns}
                    data={scoringRules}
                />

            </div>
        </div>
    )
}

const columns: ColumnDef<ScoringRule>[] = [
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "points",
        header: "Points",
    },

]


export default Page