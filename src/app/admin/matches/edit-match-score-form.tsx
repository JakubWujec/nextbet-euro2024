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
    const utils = api.useUtils();
    const form = useForm<UpdateMatchScoreInput>({
        resolver: zodResolver(updateMatchScoreSchema),
        defaultValues: {
            ...preloadedValues,
            matchId: preloadedValues.id,
            homeTeamScore: preloadedValues.homeTeamScore ?? 0,
            awayTeamScore: preloadedValues.awayTeamScore ?? 0
        }
    })

    const deleteMatch = api.match.deleteOne.useMutation({
        onSuccess: async () => {
            await utils.match.getList.invalidate()
        },
    });


    const updateMatch = api.match.updateScore.useMutation({
        onSuccess: async () => {
            await utils.match.getList.invalidate()
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
                <h1 className="text-3xl font-semibold">Edit Match</h1>
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
                            <FormLabel>{preloadedValues.homeTeam.name}</FormLabel>
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
                            <FormLabel>{preloadedValues.awayTeam.name}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => {
                    deleteMatch.mutate({ id: preloadedValues.id })
                }
                }>Delete</Button>
            </form>
        </Form>
    );
}
