import SideNav from "./sidenav";
import { getServerAuthSession } from "@/server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();

    if (session?.user.role != 'ADMIN') {
        return <div>I&apos;m sorry, you are not an admin.</div>
    }

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64 bg-sky-300">
                <SideNav></SideNav>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}




