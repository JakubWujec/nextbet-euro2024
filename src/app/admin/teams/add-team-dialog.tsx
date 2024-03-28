"use client";


import { CreateTeamForm } from "@/app/_components/create-team";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function AddTeamDialog() {
    return (
        <Dialog>
            <DialogTrigger>Add Team</DialogTrigger>
            <DialogContent>
                <CreateTeamForm></CreateTeamForm>
            </DialogContent>
        </Dialog>
    )
}