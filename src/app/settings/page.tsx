import ChangeName from "./change-name"

function Page() {
    return (
        <div className="sm:w-[80%] mx-auto">
            <h1 className="text-3xl font-semibold my-4">Your account</h1>

            <div className="p-4 border-2 border-solid">
                <p className="text-xl font-semibold my-4">CHANGE NAME</p>
                <ChangeName></ChangeName>
            </div>

        </div>
    )
}

export default Page