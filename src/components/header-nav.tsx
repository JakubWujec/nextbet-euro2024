"use client"

import { Package2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
type HeaderNavProps = {
    links: {
        label: string;
        href: string;
    }[]
}

function HeaderNav({ links }: HeaderNavProps) {
    const pathname = usePathname()
    return (<nav className="hidden h-[100%] flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Next Bet</span>
        </Link>

        {links.map(link =>
            <div key={link.label} className={`${pathname === link.href ? `flex items-center justify-center h-[100%] border-b-2 border-blue-600 ` : ''}`}>
                <Link
                    href={link.href}
                    className={`transition-colors text-nowrap font-semibold ${pathname === link.href ? `text-blue-600 ` : ''}`}
                >
                    {link.label}
                </Link>
            </div>)}

    </nav >)
}

export default HeaderNav