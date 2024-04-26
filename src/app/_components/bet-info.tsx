import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { MatchWithBet } from "@/schema/match.schema";
import { format } from "date-fns";
import { BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { MatchBetStats } from "./match-bet-stats/match-bet-stats";

type BetInfoProps = {
    match: MatchWithBet
}

export function BetInfo({ match }: BetInfoProps) {
    const hasBet = match.bets.length;

    return (
        <div className="w-full grid grid-cols-5 grid-rows-4 gap-2 border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="flex flex-col items-center justify-center row-span-1 col-span-5">
                <p className="text-md">{format(match.startDate, 'MM/dd/yyyy HH:mm')}</p>
            </div>
            <div className="flex flex-col items-center justify-center col-start-1 col-span-2 row-start- row-span-2">
                <Image src={`/flags/${match.homeTeam.code}.svg`} alt={match.homeTeam.code} width="64" height="64" />
                <p>{match.homeTeam.name}</p>
                <p className="text-xl font-bold">{match.homeTeamScore ?? "?"}</p>
            </div>

            <div className="flex flex-col pb-4 items-center justify-center col-start-3 col-span-1 row-start-3 row-span-1">
                <p className="text-sm font-semibold whitespace-nowrap">Your bet:</p>
                {hasBet ?
                    <p className="text-sm font-bold">{match.bets[0]?.homeTeamScore ?? "?"}:{match.bets[0]?.awayTeamScore ?? "?"}</p>
                    :
                    <p className="text-sm font-bold">No bet</p>
                }
            </div>

            <div className="flex flex-col items-center justify-center col-start-4 col-span-2 row-start-2 row-span-2">
                <Image src={`/flags/${match.awayTeam.code}.svg`} alt={match.awayTeam.code} width="64" height="64" />
                <p>{match.awayTeam.name}</p>
                <p className="text-xl font-bold">{match.awayTeamScore ?? "?"}</p>
            </div>

            <div className="relative bg-green-200 row-start-4 col-span-5">
                <div className="absolute top-0 right-0 pt-2 pr-2">
                    <Dialog>
                        <DialogTrigger><BarChart3 /></DialogTrigger>
                        <DialogContent>
                            <MatchBetStats matchId={match.id}></MatchBetStats>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center justify-center h-full">
                    <p className="text-3xl font-semibold">{match.bets[0]?.points ?? 0}</p>
                    <p className="text-sm">pts.</p>
                </div>
            </div>
        </div>
    )
}

