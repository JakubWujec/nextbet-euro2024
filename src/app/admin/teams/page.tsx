import { ListTeam } from "@/app/_components/list-team"
import Link from "next/link"

function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold my-4">Teams</h1>
      <Link href={'/admin/teams/create'}>Create Team</Link>
      <ListTeam></ListTeam>
    </div>
  )
}

export default Page