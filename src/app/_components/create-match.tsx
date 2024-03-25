"use client";

import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  startDate: z.date(),
})

type CreateMatchInput = z.infer<typeof formSchema>

export function CreateMatchForm() {
  const router = useRouter();

  const form = useForm<CreateMatchInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeTeamId: 1,
      awayTeamId: 1,
      startDate: new Date()
    },
  })

  const createMatch = api.match.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function onSubmit(values: CreateMatchInput) {
    createMatch.mutate({
      ...values,
      startDate: new Date().toISOString()
    });
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="homeTeamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Team</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="awayTeamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Away Team</FormLabel>
              <FormControl>
                <Input placeholder="Team Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
