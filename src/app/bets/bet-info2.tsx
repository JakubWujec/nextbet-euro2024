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
        <CardContent >
            <div>{format(match.startDate, 'MM/dd/yyyy HH:mm')}</div>
            <div className="flex flex-row justify-center gap-x-10">
               

            </div>
            <Button type="submit">Submit</Button>
        </CardContent>
    </Card>
              
    )
}