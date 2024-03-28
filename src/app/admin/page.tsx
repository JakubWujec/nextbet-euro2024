import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateTeamForm } from "../_components/create-team"
import { ListTeam } from "../_components/list-team"
import { CreateMatchForm } from "../_components/create-match"
import { ListMatch } from "../_components/list-match"


function AdminPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-bold tracking-tight my-4">Admin</h1>
      <Tabs defaultValue="matches">
        <TabsList>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="matches">
          <ListMatch></ListMatch>
          <CreateMatchForm></CreateMatchForm>
        </TabsContent>
        <TabsContent value="teams">
          <ListTeam></ListTeam>
          <CreateTeamForm></CreateTeamForm>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage