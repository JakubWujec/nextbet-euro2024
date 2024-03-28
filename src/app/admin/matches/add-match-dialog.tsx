"use client";


import { CreateMatchForm } from "@/app/_components/create-match";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function AddMatchDialog() {
    return (
        <Dialog>
            <DialogTrigger>Add Match</DialogTrigger>
            <DialogContent>
                <CreateMatchForm></CreateMatchForm>
            </DialogContent>
        </Dialog>
    )
}