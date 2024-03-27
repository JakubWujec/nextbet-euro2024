import { CreateMatchForm } from "@/app/_components/create-match"
import { ListMatch } from "@/app/_components/list-match"
import { EditMatchDialog } from "./edit-match-dialog"

function Page() {
    return (
      <div>
          <h1>Admin Teams Matches</h1>
          <EditMatchDialog matchId={6}></EditMatchDialog>
          <ListMatch></ListMatch>
          <CreateMatchForm></CreateMatchForm>
      </div>
    )
  }
  
  export default Page