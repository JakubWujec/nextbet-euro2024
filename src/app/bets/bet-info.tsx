import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MatchWithBet } from "@/schema/match.schema";
import { match } from "assert";
import { format } from "date-fns";


type BetInfoProps = {
    match: MatchWithBet
}

export function BetInfo({ match }: BetInfoProps) {
    return (
        <Card>
            <CardContent className="flex justify-between items-center p-6">
                <div>
                    <div>{format(match.startDate, 'MM/dd/yyyy')}</div>
                    <div>{format(match.startDate, 'HH:mm')}</div>
                </div>
                <div>
                  
                    <div>{match.homeTeam.name}</div>
                    <div>{match.awayTeam.name}</div>
                </div>
                <div>
                    <div>Result</div>
                    <div>{65}</div>
                    <div>{34}</div>
                </div>
                <div>
                    <div>Your Bet</div>
                    <div>{match.bets[0]?.homeTeamScore}</div>
                    <div>{match.bets[0]?.awayTeamScore}</div>
                </div>
                <div>
                    <div>Points</div>
                    <div>3</div>
                   
                </div>
            </CardContent>
        </Card>
    )
}