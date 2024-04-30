import { ListTeam } from "@/app/_components/list-team"
import Link from "next/link"
import { CirclePlus } from 'lucide-react';

function Page() {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Teams</h1>
        <Link
          href={'/admin/teams/create'}
          className="flex items-center h-8 gap-1 p-2 bg-slate-200 rounded"
        >
          <p className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Team
          </p>
          <CirclePlus className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ListTeam></ListTeam>
    </>
  )
}

export default Page