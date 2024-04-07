import { CreateTeamForm } from "@/app/_components/create-team"
import { ListTeam } from "@/app/_components/list-team"

function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold my-4">Teams</h1>
      <ListTeam></ListTeam>
      <CreateTeamForm></CreateTeamForm>
    </div>
  )
}

export default Page