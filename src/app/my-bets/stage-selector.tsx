import { Button } from "@/components/ui/button";
import { Stage } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";

type StageSelectorProps = {
    stages: Stage[]
    selectedStage: Stage;
    setSelectedStage: (stage: Stage) => void;
}

export function StageSelector({ stages, selectedStage, setSelectedStage }: StageSelectorProps) {

    return (
        <Select onValueChange={(value) => setSelectedStage(value as Stage)} defaultValue={selectedStage}>
            <Label className="text-xl">Select stage</Label>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tournament Stage" />
            </SelectTrigger>
            <SelectContent>
                {stages.map(stage => {
                    return (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select >
    )
}