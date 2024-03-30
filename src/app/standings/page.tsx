"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { api } from "@/trpc/react";

function StandingsPage() {
  const { data: standings, isLoading } = api.standings.getList.useQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!standings) {
    return <div>No data</div>
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold my-4">Standings</h1>
      <DataTable columns={columns} data={standings} />
    </div>
  )
}

export default StandingsPage