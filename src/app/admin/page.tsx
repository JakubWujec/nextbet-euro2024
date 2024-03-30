import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListMatch } from "../_components/list-match"
import { ListTeam } from "../_components/list-team"
import { AddMatchDialog } from "./matches/add-match-dialog"
import { AddTeamDialog } from "./teams/add-team-dialog"
import { Button } from "@/components/ui/button"
import { UpdatePoints } from "./actions/update-points"

function AdminPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-bold tracking-tight my-4">Admin</h1>
      <Tabs defaultValue="matches">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="actions">
          <div className="flex items-center justify-between">
            <UpdatePoints></UpdatePoints>
          </div>
        </TabsContent>
        <TabsContent value="matches">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <AddMatchDialog></AddMatchDialog>
            </div>
          </div>
          <ListMatch></ListMatch>
        </TabsContent>
        <TabsContent value="teams">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <AddTeamDialog></AddTeamDialog>
            </div>
          </div>
          <ListTeam></ListTeam>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage