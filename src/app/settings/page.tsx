import ChangeName from "./change-name"
import { getServerAuthSession } from "@/server/auth";

async function Page() {
    const session = await getServerAuthSession();

    if (!session?.user) {
        return <div>Loading</div>
    }

    return (
        <div className="sm:w-[80%] mx-auto">
            <h1 className="text-3xl font-semibold my-4">Your account</h1>

            {!!session?.user.name &&
                <div className="p-4 border-2 border-solid">
                    <p className="text-xl font-semibold my-4">CHANGE NAME</p>
                    <ChangeName username={session?.user.name}></ChangeName>
                </div>
            }

        </div>
    )
}

export default Page