"use client"

import { columns } from "@/app/admin/matches/columns";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { api } from "@/trpc/react";
import { useState } from "react";
import { EditMatchDialog } from "./edit-match-dialog";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";


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
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-semibold">Matches</h1>
        <Link
          href={'/admin/matches/create'}
          className="flex items-center h-8 gap-1 p-2 bg-slate-200 rounded"
        >
          <p className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Match
          </p>
          <CirclePlus className="h-3.5 w-3.5" />
        </Link>
      </div>
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