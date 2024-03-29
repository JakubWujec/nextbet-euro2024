import { MatchWithBet } from "@/schema/match.schema";
import { format } from "date-fns";


type BetInfoProps = {
    match: MatchWithBet
}

export function BetInfo({ match }: BetInfoProps) {
    return (
        <div className="grid grid-cols-4 grid-rows-4 gap-4 border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="flex flex-col items-center justify-center row-span-2">
                <p className="text-lg font-semibold">{match.homeTeam.name}</p>
                <p className="text-xl font-bold">3</p>
            </div>
            <div className="flex flex-col items-center justify-center row-span-2">
                <p className="text-2xl font-semibold">VS</p>
                <p className="text-sm">{format(match.startDate, "hh:mm")}</p>
            </div>
            <div className="flex flex-col items-center justify-center row-span-2">
                <p className="text-lg font-semibold">{match.awayTeam.name}</p>
                <p className="text-xl font-bold">2</p>
            </div>
            <div className="flex flex-col items-center justify-center col-span-3 row-span-2 col-start-1 row-start-3">
                <p className="text-lg font-semibold">Your bet:</p>
                <p className="text-xl font-bold">{match.bets[0]?.homeTeamScore}:{match.bets[0]?.awayTeamScore}</p>
            </div>
            <div className="flex items-center justify-center bg-green-200 row-span-4 col-start-4 row-start-1">
                <p className="text-3xl font-semibold">10</p>
                <p className="text-sm">pts.</p>
            </div>
        </div>
    )
}