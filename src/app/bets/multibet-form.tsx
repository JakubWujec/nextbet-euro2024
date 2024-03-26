"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

type MultiBetInput = z.infer<typeof multibetSchema>

type MultibetFormProps = {
  matches: ({
    awayTeam: {
      id: number;
      name: string;
      code: string;
    };
    homeTeam: {
      id: number;
      name: string;
      code: string;
    };
  } & {
    id: number;
    homeTeamId: number;
    homeTeamScore: number | null;
    awayTeamId: number;
    awayTeamScore: number | null;
    startDate: Date;
    finished: boolean;
  })[]
}

export function MultibetForm({ matches }: MultibetFormProps) {
  const form = useForm<MultiBetInput>({
    resolver: zodResolver(multibetSchema),
    defaultValues: {
      bets: matches.map(match => {
        return {
          matchId: match.id,
          homeTeamScore: 0,
          awayTeamScore: 0
        }
      })
    }
  })

  function onSubmit(values: MultiBetInput) {
    console.log("VALUES", values)
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
