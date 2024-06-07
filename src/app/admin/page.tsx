import { DeleteMocks } from "./delete-mocks"
import { RunMocks } from "./mocks"
import { UpdatePoints } from "./update-points"

function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Admin</h1>
      <div className="flex gap-2">
        <UpdatePoints></UpdatePoints>
        <RunMocks></RunMocks>
        <DeleteMocks></DeleteMocks>
      </div>

    </div>
  )
}

export default AdminPage