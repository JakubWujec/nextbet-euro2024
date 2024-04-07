"use client"

import { columns } from "@/app/matches/columns";
import { DataTable } from "@/components/ui/data-table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { api } from "@/trpc/react";
import { useState } from "react";
import { EditMatchDialog } from "./edit-match-dialog";


function Page() {
  const [page, setPage] = useState(1);
  const { data: matches, isLoading } = api.match.getList.useQuery({
    page: page,
    pageSize: 5
  },);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>()

  return (
    <div className="mx-auto grid w-full gap-2">
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => {
              setPage(page => Math.max(1, page - 1))
            }} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => {
              setPage(page => page + 1)
            }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Page