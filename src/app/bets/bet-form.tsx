"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateBetInput, createBetSchema } from "@/schema/bet.schema";
import { MatchWithBet } from "@/schema/match.schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { useForm } from "react-hook-form";
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

type BetFormProps = {
    match: MatchWithBet
}

export function BetForm({ match }: BetFormProps) {
    const { toast } = useToast()
    const [isBetPlaced, setIsBetPlaced] = useState<boolean>(!!match.bets.length);
    const form = useForm<CreateBetInput>({
        resolver: zodResolver(createBetSchema),
        defaultValues: {
            matchId: match.id,
            homeTeamScore: match.bets[0]?.homeTeamScore ?? 0,
            awayTeamScore: match.bets[0]?.awayTeamScore ?? 0
        }
    })

    const createBet = api.bet.createOrUpdate.useMutation({
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Saved",
                description: "Bet saved successfully",
            })
            setIsBetPlaced(true);
        },
    });

    function onSubmit(values: CreateBetInput) {

        createBet.mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Card>
                    <CardContent className="grid grid-cols-5 grid-rows-4 gap-2 border border-gray-300 rounded-lg overflow-hidden shadow-md py-4">
                        <div className="row-span-1 col-span-5 flex justify-center items-center">{format(match.startDate, 'MM/dd/yyyy HH:mm')}</div>
                        <div className="row-start-2 row-span-2 col-start-1 col-span-2 flex justify-evenly items-center flex-wrap">
                            <FormLabel className="flex flex-col gap-1 items-center">
                                <Image src={`/flags/${match.homeTeam.code}.svg`} alt={match.homeTeam.code} width="96" height="96" />
                                <p>{match.homeTeam.name}</p>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name={`homeTeamScore`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center">
                                        <FormControl>
                                            <Input className="w-24" type="number" min="0" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="row-start-2 row-span-2 col-start-3 col-span-1  flex justify-center items-center">
                            <p>VS</p>
                        </div>
                        <div className="row-start-2 row-span-2 col-start-4 col-span-2  flex justify-evenly items-center flex-wrap-reverse">
                            <FormField
                                control={form.control}
                                name={`awayTeamScore`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center">

                                        <FormControl>
                                            <Input className="w-24" type="number" min="0" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormLabel className="flex flex-col gap-1 items-center">
                                <Image src={`/flags/${match.awayTeam.code}.svg`} alt={match.awayTeam.code} width="96" height="96" />
                                <p>{match.awayTeam.name}</p>
                            </FormLabel>
                        </div>
                        <div className="row-start-4 row-span-1 col-start-1 col-span-5 flex justify-center items-center">
                            <Button type="submit">{isBetPlaced ? "Update" : "Save"}</Button>
                        </div>
                    </CardContent>
                </Card>


            </form>
        </Form>
    );
}

