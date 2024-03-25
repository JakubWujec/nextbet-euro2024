import { CreateMatchForm } from "@/app/_components/create-match"
import { ListMatch } from "@/app/_components/list-match"

function Page() {
    return (
      <div>
          <h1>Admin Teams Matches</h1>
          <ListMatch></ListMatch>
          <CreateMatchForm></CreateMatchForm>
      </div>
    )
  }
  
  export default Page