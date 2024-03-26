"use client";

import { useRouter } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateMatchInput, createMatchSchema } from "@/schema/match.schema";

export function CreateMatchForm() {
  const router = useRouter();

  const { data: teams, isLoading } = api.team.getList.useQuery();

  const form = useForm<CreateMatchInput>({
    resolver: zodResolver(createMatchSchema),
    defaultValues: {
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
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
      startDate: new Date().toISOString()
    });
  }

  if (!teams) {
    return <div>Loading...</div>
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
              <Select onValueChange={(value) => form.setValue("homeTeamId", parseInt(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Away Team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams?.map((team) =>
                    <SelectItem key={`${team.name}_${team.code}`} value={`${team.id}`}>{team.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
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
              <Select onValueChange={(value) => form.setValue("awayTeamId", parseInt(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Away Team" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {teams?.map((team) =>
                    <SelectItem key={`${team.name}_${team.code}`} value={`${team.id}`}>{team.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => console.log(form.getValues())}>Test</Button>
      </form>
    </Form>
  );
}
