import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUser, Menu, Package2 } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { getServerAuthSession } from "@/server/auth"
import { UserRole } from "@prisma/client"
import HeaderNav from "./header-nav"

export async function Header() {
    const session = await getServerAuthSession();
    const username = session?.user.name
    const links = getNavLinks(session?.user.role);

    return (
        <header className="sticky top-0 h-16 border-b bg-background z-20">
            <div className="flex max-w-7xl items-center gap-4 px-4  h-[100%] mx-auto ">
                <HeaderNav links={links}></HeaderNav>
                {/* <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {links.map(link => <Link
                        key={link.label}
                        href={link.href}
                        className="text-foreground transition-colors hover:text-foreground text-nowrap font-semibold"
                    >
                        {link.label}
                    </Link>)}
                </nav> */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            {links.map(link => <Link
                                key={link.label}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                {link.label}
                            </Link>)}
                        </nav>
                    </SheetContent>
                </Sheet>
                {session &&
                    <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>

                            <>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>{username}</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Link
                                            href={"/settings"}
                                        >
                                            Settings
                                        </Link></DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Link
                                        href={"/api/auth/signout"}
                                    >
                                        Sign out
                                    </Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </>
                        </DropdownMenu>
                    </div>
                }
            </div>
        </header>
    )
}

function getNavLinks(userRole: UserRole | null | undefined) {
    const links: {
        label: string;
        href: string;
    }[] = [];
    const userLinks = [
        {
            label: 'My Bets',
            href: '/my-bets'
        },
        {
            label: "Standings",
            href: '/standings'
        }
    ]
    const adminLinks = [
        {
            label: 'Admin',
            href: '/admin',
        },
    ]
    if (userRole === 'ADMIN') {
        links.push(...adminLinks)
    }
    if (userRole != null) {
        links.push(...userLinks)
    }


    return links;
}