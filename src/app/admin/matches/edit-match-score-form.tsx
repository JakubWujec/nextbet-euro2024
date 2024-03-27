"use client";


import { api } from "@/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetOneMatchOutput, UpdateMatchScoreInput, updateMatchScoreSchema } from "@/schema/match.schema";

type EditMatchScoreFormProps = {
    preloadedValues: GetOneMatchOutput
}

export function EditMatchScoreForm({ preloadedValues }: EditMatchScoreFormProps) {
    const form = useForm<UpdateMatchScoreInput>({
        resolver: zodResolver(updateMatchScoreSchema),
        defaultValues: {
            ...preloadedValues,
            matchId: preloadedValues.id,
            homeTeamScore: preloadedValues.homeTeamScore ?? 0,
            awayTeamScore: preloadedValues.awayTeamScore ?? 0
        }
    }) 

    const updateMatch = api.match.updateScore.useMutation({
        onSuccess: () => {
            console.log("HA")
        },
    });

    function onSubmit(values: UpdateMatchScoreInput) {
        updateMatch.mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <div>{preloadedValues.homeTeam.name} vs {preloadedValues.awayTeam.name}</div>
                <FormField
                    control={form.control}
                    name='matchId'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='homeTeamScore'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Home Team Score</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='awayTeamScore'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Away Team Score</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => console.log(form.formState)}>TEST</Button>
            </form>
        </Form>
    );
}
