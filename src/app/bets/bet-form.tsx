import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateBetInput, createBetSchema } from "@/schema/bet.schema";
import { MatchWithBet } from "@/schema/match.schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from 'date-fns'

type BetFormProps = {
    match: MatchWithBet
}

export function BetForm({ match }: BetFormProps) {
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
            console.log("SUCCESS")
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
                    <CardContent >
                        <div>{format(match.startDate, 'MM/dd/yyyy HH:mm')}</div>
                        <div className="flex flex-row justify-center gap-x-10">
                            <FormField
                                control={form.control}
                                name={`homeTeamScore`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center">

                                        <FormControl>
                                            <Input className="w-24" type="number" {...field} />
                                        </FormControl>
                                        <FormLabel>{match.homeTeam.name}</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`awayTeamScore`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center">
                                        <FormLabel>{match.awayTeam.name}</FormLabel>
                                        <FormControl>
                                            <Input className="w-24" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <Button type="submit">Submit</Button>
                    </CardContent>
                </Card>

               
            </form>
        </Form>
    );
}