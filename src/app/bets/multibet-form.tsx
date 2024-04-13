"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetListWithCurrentUserBetsOutput } from "@/schema/match.schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const betSchema = z.object({
  matchId: z.coerce.number(),
  homeTeamScore: z.coerce.number(),
  awayTeamScore: z.coerce.number(),
})

const multibetSchema = z.object(
  {
    bets: z.array(
      betSchema
    )
  }
)

function propsToFormValues(props: MultibetFormProps) {
  return props.matches.map((match, index) => {
    return {
      matchId: match.id,
      homeTeamScore: match.bets[0]?.homeTeamScore ?? 0,
      awayTeamScore: match.bets[0]?.awayTeamScore ?? 0
    }
  })
}

type MultiBetInput = z.infer<typeof multibetSchema>

type MultibetFormProps = {
  matches: GetListWithCurrentUserBetsOutput
}

export function MultibetForm({ matches }: MultibetFormProps) {
  const form = useForm<MultiBetInput>({
    resolver: zodResolver(multibetSchema),
    defaultValues: {
      bets: propsToFormValues({ matches })
    },
    values: {
      bets: propsToFormValues({ matches })
    }
  })

  const createBet = api.bet.createOrUpdate.useMutation({
    onSuccess: () => {

    },
  });

  function onSubmit(values: MultiBetInput) {
    for (let bet of values.bets) {
      createBet.mutate(bet);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {matches.map((match, index) =>
          <Card key={match.id}>
            <CardContent>
              <div>{match.homeTeam.name} - {match.awayTeam.name}</div>
              <FormField
                control={form.control}
                name={`bets.${index}.homeTeamScore`}
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
                name={`bets.${index}.awayTeamScore`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Away Team Score</FormLabel>
                    <FormControl>
                      <Input type="number"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
