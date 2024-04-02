"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserBetList } from "./list-user-bets";

type UserBetsDialogProps = {
    userName: string;
    open: boolean;
    setOpen: (open: boolean) => void
}

export function UserBetsDialog({ userName, open, setOpen }: UserBetsDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <UserBetList userName={userName}></UserBetList>
            </DialogContent>
        </Dialog >
    )
}