import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();


  return (
    <main className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Next-Bet
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {!session &&
            (
              <>
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                    Start today.
                  </p>
                </div>
                <div className="grid gap-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href={"/api/auth/signin"}
                      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                    >
                      {"Enter"}
                    </Link>
                  </Button>
                </div></>)
          }
          {
            session && (
              <div className="grid gap-2 text-center">
                <p className="text-center text-2xl">
                  <span>Logged in as {session.user?.name}</span>
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link
                    href={"/api/auth/signout"}
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    Sign out
                  </Link></Button>
              </div>
            )
          }
        </div>
      </div>


    </main >

  )
}

