"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from 'next/image'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = {
    id: number
    name: string;
    code: string;
}

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Team Name",
    },
    {
        accessorKey: "code",
        header: "TeamCode",
        cell: props => {
            const countryCode = props.getValue() as string;
            return (
                <div className="flex flex-col items-center w-16 justify-center">
                    <Image
                        src={`/flags/${countryCode}.svg`}
                        alt={countryCode ?? "flag"}
                        width="64" height="64" />
                    <p>{props.getValue() as string}</p>
                </div >
            )
        }
    },

]
