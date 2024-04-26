import { Stage } from "@prisma/client";
import { isBefore } from "date-fns";

function getStageByDate(date: Date) {
    if (isBefore(date, new Date("2024-06-19 00:00:00Z"))) return Stage.G1
    if (isBefore(date, new Date("2024-06-23 00:00:00Z"))) return Stage.G2
    if (isBefore(date, new Date("2024-06-27 00:00:00Z"))) return Stage.G3
    if (isBefore(date, new Date("2024-07-03 00:00:00Z"))) return Stage.R16
    if (isBefore(date, new Date("2024-07-03 00:00:00Z"))) return Stage.QF
    if (isBefore(date, new Date("2024-07-11 00:00:00Z"))) return Stage.SF
    return Stage.F
}

export {
    getStageByDate
}