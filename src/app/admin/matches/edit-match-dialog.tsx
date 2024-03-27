"use client";


import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { EditMatchScoreForm } from "./edit-match-score-form";

type EditMatchDialogProps = {
    matchId: number
}

export function EditMatchDialog({ matchId }: EditMatchDialogProps) {
    const { data: match, isLoading } = api.match.getOne.useQuery({ id: matchId });

    if (!match) return <div>Loading...</div>

    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <EditMatchScoreForm preloadedValues={match}
                ></EditMatchScoreForm>
            </DialogContent>
        </Dialog>
    )

}