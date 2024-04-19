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
  teamName: z.string().min(3).max(50),
  teamCode: z.string().min(3)
})

type CreateTeamInput = z.infer<typeof formSchema>

export function CreateTeamForm() {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamCode: ""
    },
  })

  const createTeam = api.team.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      await utils.team.getList.invalidate();
    },
  });

  function onSubmit(values: CreateTeamInput) {
    createTeam.mutate({
      code: values.teamCode,
      name: values.teamName
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
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Code</FormLabel>
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
