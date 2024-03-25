import { CreateTeamForm } from "@/app/_components/create-team"
import { ListTeam } from "@/app/_components/list-team"

function Page() {
    return (
      <div>
          <h1>Admin Teams Page</h1>
          <ListTeam></ListTeam>
          <CreateTeamForm></CreateTeamForm>
      </div>
    )
  }
  
  export default Page