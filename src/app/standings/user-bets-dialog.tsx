"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { BetInfo } from "../bets/bet-info";

type UserBetsDialogProps = {
    userName: string;
    open: boolean;
    setOpen: (open: boolean) => void
}

export function UserBetsDialog({ userName, open, setOpen }: UserBetsDialogProps) {
    const { data: matchesWithBets, isLoading } = api.match.getListWithUserBetsThatHaveStartedAlready.useQuery({ userName: userName });

    if (isLoading) return <div>Loading...</div>
    if (!matchesWithBets) return <div>Something went wrong...</div>

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
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
            </DialogContent>
        </Dialog >
    )
}