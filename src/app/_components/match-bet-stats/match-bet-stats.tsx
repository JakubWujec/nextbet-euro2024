"use client";

import { DateCarousel } from "@/components/date-carousel";
import { api } from "@/trpc/react";
import { useState } from "react";
import { isBefore } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

type MatchBetStatsProps = {
    matchId: number
}

export function MatchBetStats({ matchId }: MatchBetStatsProps) {
    const { data, isLoading } = api.bet.getMatchBetStats.useQuery({ matchId: matchId });

    if (!data) return null;

    return (
        <>
            <DataTable
                columns={columns}
                data={data['stats']}
            />
        </>


    )
}