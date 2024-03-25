"use client";

import { api } from "@/trpc/react";

export function ListMatch() {

    const { data: matches, isLoading } = api.match.getList.useQuery();

    console.log(matches);

    return (
        <div>
            Tu będzie lista meczy.
        </div>
    )
}