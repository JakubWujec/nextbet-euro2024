"use client";


import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { EditMatchScoreForm } from "./edit-match-score-form";

type EditMatchDialogProps = {
    matchId: number;
    open: boolean;
    setOpen: (open: boolean) => void
}

export function EditMatchDialog({ matchId, open, setOpen }: EditMatchDialogProps) {
    const { data: match, isLoading } = api.match.getOne.useQuery({ id: matchId });

    if (!match) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <EditMatchScoreForm preloadedValues={match}
                ></EditMatchScoreForm>
            </DialogContent>
        </Dialog>
    )

}