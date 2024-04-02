"use client"

import { CreateMatchForm } from "@/app/_components/create-match"
import { ListMatch } from "@/app/_components/list-match"
import { useState } from "react";
import { AddMatchDialog } from "./add-match-dialog";
import { EditMatchDialog } from "./edit-match-dialog";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/matches/columns";
import { api } from "@/trpc/react";


function Page() {
  const { data: matches, isLoading } = api.match.getList.useQuery({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>()

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold my-4">Matches</h1>
      <DataTable
        columns={columns}
        data={matches ?? []}
        rowClick={(data) => {
          setSelectedMatchId(data.id)
          setOpenDialog(true);
        }}
      />
      {selectedMatchId && <EditMatchDialog
        matchId={selectedMatchId}
        open={openDialog}
        setOpen={setOpenDialog}></EditMatchDialog>}
    </div>
  )
}

export default Page