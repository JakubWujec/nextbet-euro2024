import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const username = 'Adrax_Sazir'
const usernameSub = "AS24"
const winRate = 20
const betsCompleted = 40
const betsPending = 10
const points = 36


export function ProfileCard() {
    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle>{username}</CardTitle>
                <CardDescription>{usernameSub}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center flex-wrap gap-2">
                <ScoreCard title="Points" value={`${points}`}></ScoreCard>
                <ScoreCard title="Completed" value={`${betsCompleted}`}></ScoreCard>
                <ScoreCard title="Completed" value={`${betsCompleted}`}></ScoreCard>
                <ScoreCard title="Completed" value={`${betsCompleted}`}></ScoreCard>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button className="w-full">Show completed bets</Button>
            </CardFooter>
        </Card>
    )
}

type ScoreCardProps = {
    title: string;
    value: string
}

function ScoreCard({ title, value }: ScoreCardProps) {
    return (
        <Card className="w-24 aspect-square">
            <CardHeader className="flex flex-col items-center ">
                <CardTitle className="text-md">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center font-bold text-2xl">
                <p>{value}</p>
            </CardContent>

        </Card>
    )
}