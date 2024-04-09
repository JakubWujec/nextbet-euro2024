"use client"

import { X } from 'lucide-react';
import { Table } from "@tanstack/react-table"


import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

const stages = ["G", "SF"].map(val => {
    return {
        value: val,
        label: val,
    }
})

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {table.getColumn("stage") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("stage")}
                        title="Stage"
                        options={stages}
                    />
                )}

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}