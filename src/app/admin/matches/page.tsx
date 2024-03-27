import { CreateMatchForm } from "@/app/_components/create-match"
import { ListMatch } from "@/app/_components/list-match"

function Page() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold my-4">Matches</h1>
      <ListMatch></ListMatch>
      <CreateMatchForm></CreateMatchForm>
    </div>
  )
}

export default Page