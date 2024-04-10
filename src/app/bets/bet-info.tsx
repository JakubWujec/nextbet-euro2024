import { MatchWithBet } from "@/schema/match.schema";
import { format } from "date-fns";
import Image from 'next/image'


type BetInfoProps = {
    match: MatchWithBet
}

export function BetInfo({ match }: BetInfoProps) {
    const hasBet = match.bets.length;

    return (
        <div className="grid grid-cols-4 grid-rows-4 gap-2 border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="flex flex-col items-center justify-center row-span-4">
                <Image src={`/flags/${match.homeTeam.code}.svg`} alt={match.homeTeam.code} width="64" height="64" />
                <p className="text-lg font-semibold">{match.homeTeam.name}</p>
                <p className="text-xl font-bold">{match.homeTeamScore ?? "?"}</p>
            </div>
            <div className="flex flex-col items-center justify-center row-span-2">
                <p className="text-sm">{format(match.startDate, "HH:mm")}</p>
            </div>
            <div className="flex flex-col items-center justify-center row-span-4">
                <Image src={`/flags/${match.awayTeam.code}.svg`} alt={match.awayTeam.code} width="64" height="64" />
                <p className="text-lg font-semibold">{match.awayTeam.name}</p>
                <p className="text-xl font-bold">{match.awayTeamScore ?? "?"}</p>
            </div>
            <div className="flex flex-col pb-4 items-center justify-center col-start-2 col-span-1 row-start-3 row-span-2">
                {hasBet ? <>
                    <p className="text-sm font-semibold">Your bet:</p>
                    <p className="text-sm font-bold">{match.bets[0]?.homeTeamScore ?? "?"}:{match.bets[0]?.awayTeamScore ?? "?"}</p>
                </> : <>
                    <p className="text-sm font-semibold">Your bet:</p>
                    <p className="text-sm font-bold">No bet</p>
                </>}

            </div>
            <div className="flex items-center justify-center bg-green-200 row-start-1 row-span-4 col-start-4">
                <p className="text-3xl font-semibold">{match.bets[0]?.points ?? 0}</p>
                <p className="text-sm">pts.</p>
            </div>
        </div>
    )
}

