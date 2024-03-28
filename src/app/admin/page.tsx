import Link from 'next/link'

function AdminPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-bold tracking-tight my-4">Admin</h1>
      <div className='flex flex-col'>
        <Link href="admin/teams">Teams</Link>
        <Link href="admin/matches">Matches</Link>
      </div>
    </div>
  )
}

export default AdminPage