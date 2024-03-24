import { CreateMatchForm } from "@/app/_components/create-match"
import { CreateTeamForm } from "@/app/_components/create-team"

function Page() {
    return (
      <div>
          <h1>Admin Teams Matches</h1>
          <CreateMatchForm></CreateMatchForm>
      </div>
    )
  }
  
  export default Page