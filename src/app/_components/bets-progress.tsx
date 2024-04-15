import { Progress } from "@/components/ui/progress";
import { MatchWithBet } from "@/schema/match.schema"

type BetsProgressType = {
    matchesWithBets: MatchWithBet[];
}
export function BetsProgress({ matchesWithBets }: BetsProgressType) {
    const betCount = matchesWithBets?.reduce((counter, match) => counter + (match.bets.length ? 1 : 0), 0) ?? 0;

    if (!matchesWithBets.length) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <p>You have placed {betCount} of given {matchesWithBets.length} bets.</p>
            <Progress value={100 * betCount / matchesWithBets.length}></Progress>
        </div>
    )
}