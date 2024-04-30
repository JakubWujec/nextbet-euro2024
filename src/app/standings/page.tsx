"use client";

import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useState } from "react";
import { ProfileCard } from "../_components/profile-card";
import { columns } from "./columns";
import { format } from "date-fns";

function StandingsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const { data, isLoading } = api.standings.getList.useQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    return <div>No data...</div>
  }
  const { standings, lastUpdated } = data

  return (
    <>
      <h1 className="text-3xl font-semibold my-4">Standings</h1>
      {lastUpdated && <p>Last updated: {format(lastUpdated, 'EEE dd MMM yyyy HH:mm')}</p>}
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
    </>
  )
}

export default StandingsPage