"use client";

import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useState } from "react";
import { ProfileCard } from "../_components/profile-card";
import { columns } from "./columns";

function StandingsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
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
      <DataTable
        columns={columns}
        data={standings}
        rowClick={(standing) => {
          setSelectedUserName(standing.name)
          setOpenDialog((open) => !open)
        }}
      />
      {selectedUserName &&
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent >
            <ProfileCard name={selectedUserName} showProfileButton={true}></ProfileCard>
          </DialogContent>
        </Dialog >
      }
    </div>
  )
}

export default StandingsPage