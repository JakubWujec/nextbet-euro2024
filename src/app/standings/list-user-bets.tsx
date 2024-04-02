"use client"

import { api } from "@/trpc/react";
import { BetInfo } from "../bets/bet-info";

type UserBetList = {
    userName: string;
}

export function UserBetList({ userName }: UserBetList) {
    const { data: matchesWithBets, isLoading } = api.match.getListWithUserBetsThatHaveStartedAlready.useQuery({ userName: userName });

    if (isLoading) return <div>Loading...</div>
    if (!matchesWithBets) return <div>Something went wrong...</div>

    return (
        <div>
            {(!matchesWithBets.length) ? (<div> No matches this day.</div>) :
                <div>
                    {matchesWithBets.map(matchWithBet =>
                        <div key={matchWithBet.id} className="my-4">
                            <BetInfo match={matchWithBet}></BetInfo>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}