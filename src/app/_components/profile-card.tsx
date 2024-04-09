import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const username = 'Adrax_Sazir'
const usernameSub = "AS24"
const winRate = 20
const betsCompleted = 40
const betsPending = 10
const points = 36

type ProfileCardProps = {
    name: string;
}

export function ProfileCard({ name }: ProfileCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{usernameSub}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center flex-wrap gap-2">
                <ScoreCard title="Points" value={`${points}`}></ScoreCard>
                <ScoreCard title="Completed" value={`${betsCompleted}`}></ScoreCard>
                <ScoreCard title="Completed" value={`${betsCompleted}`}></ScoreCard>
                <ScoreCard title="Completed" value={`${betsCompleted}`}></ScoreCard>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button asChild className="w-full">
                    <Link href={`/users/${name}`} target="_blank">Show Profile</Link>
                </Button>
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