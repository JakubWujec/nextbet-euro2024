import Link from 'next/link'

function AdminPage() {
  return (
    <div>
      <h1>Admin</h1>
      <div className='flex flex-col'>
        <Link href="admin/teams">Teams</Link>
        <Link href="admin/matches">Matches</Link>
      </div>


    </div>
  )
}

export default AdminPage