"use client"

import { ChangeNameInput, changeNameSchema } from "@/schema/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function ChangeName() {
    const router = useRouter();
    const form = useForm<ChangeNameInput>({
        resolver: zodResolver(changeNameSchema),
        defaultValues: {
            name: "Test"
        },
    })

    const changeName = api.user.changeName.useMutation({
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Saved",
                description: "Name saved successfully",
            })
            router.refresh();
        },
    });

    function onSubmit(values: ChangeNameInput) {
        changeName.mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ChangeName