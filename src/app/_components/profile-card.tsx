"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import Link from "next/link";


type ProfileCardProps = {
    name: string;
}

export function ProfileCard({ name }: ProfileCardProps) {
    const { data, isLoading } = api.user.getUserStats.useQuery({ userName: name });

    if (!data) return null;

    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{name}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center flex-wrap gap-2">
                <ScoreCard title="Bets" value={`${data.count}`}></ScoreCard>
                <ScoreCard title="Points" value={`${data.points}`}></ScoreCard>
                <ScoreCard title="Winners" value={`${data.correctWinner}`}></ScoreCard>
                <ScoreCard title="Scores" value={`${data.correctScore}`}></ScoreCard>
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
                <CardTitle className="text-md whitespace-nowrap">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center font-bold text-2xl">
                <p>{value}</p>
            </CardContent>
        </Card>
    )
}