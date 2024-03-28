"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const MOCK_DATA = [
    {
        id: 1,
        name: "John",
        overallPoints: 3,
        rank: 1
    },
    {
        id: 2,
        name: "Amy",
        overallPoints: 2,
        rank: 2
    }
]


function StandingsPage() {

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold my-4">Standings</h1>
        <DataTable columns={columns} data={MOCK_DATA} />
    </div>
  )
}

export default StandingsPage