"use client";

import { api } from "@/trpc/react";
import { ProfileCard } from "../../_components/profile-card";
import { BetInfo } from "@/app/_components/bet-info";

function Page({ params: { name } }: { params: { name: string } }) {
    const decodedName = decodeURI(name)
    const { data: matchesWithBets, isLoading } = api.match.getListWithUserBetsThatHaveStartedAlready.useQuery({ userName: decodedName });

    if (isLoading) return <div>Loading...</div>
    if (!matchesWithBets) return <div>Something went wrong...</div>

    return (
        <div className="mt-2">
            <ProfileCard name={decodedName}></ProfileCard>
            <div className="mt-4">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Previous bets</h2>
                {matchesWithBets.map(matchWithBet =>
                    <div key={matchWithBet.id} className="my-4">
                        <BetInfo match={matchWithBet}></BetInfo>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page