"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";


interface DateTimePickerProps {
    onValueChanged: (date: Date) => void;
}

export function DateTimePicker({ onValueChanged }: DateTimePickerProps) {
    const [date, setDate] = React.useState<Date>();

    useEffect(() => {
        if (date) {
            onValueChanged(date);
        }
    }, [date])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="p-3 border-t border-border">
                    <TimePickerDemo setDate={setDate} date={date} />
                </div>
            </PopoverContent>
        </Popover>
    );
}

interface TimePickerDemoProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}
export function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
                <Label htmlFor="hours" className="text-xs">
                    Hours
                </Label>
                <TimePickerInput
                    picker="hours"
                    date={date}
                    setDate={setDate}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1 text-center">
                <Label htmlFor="minutes" className="text-xs">
                    Minutes
                </Label>
                <TimePickerInput
                    picker="minutes"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1 text-center">
                <Label htmlFor="seconds" className="text-xs">
                    Seconds
                </Label>
                <TimePickerInput
                    picker="seconds"
                    date={date}
                    setDate={setDate}
                    ref={secondRef}
                    onLeftFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="flex h-10 items-center">
                <Clock className="ml-2 h-4 w-4" />
            </div>
        </div>
    );
}

export interface TimePickerInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    picker: TimePickerType;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    onRightFocus?: () => void;
    onLeftFocus?: () => void;
}

const TimePickerInput = React.forwardRef<
    HTMLInputElement,
    TimePickerInputProps
>(
    (
        {
            className,
            type = "tel",
            value,
            id,
            name,
            date = new Date(new Date().setHours(0, 0, 0, 0)),
            setDate,
            onChange,
            onKeyDown,
            picker,
            onLeftFocus,
            onRightFocus,
            ...props
        },
        ref
    ) => {
        const [flag, setFlag] = React.useState<boolean>(false);

        /**
         * allow the user to enter the second digit within 2 seconds
         * otherwise start again with entering first digit
         */
        React.useEffect(() => {
            if (flag) {
                const timer = setTimeout(() => {
                    setFlag(false);
                }, 2000);

                return () => clearTimeout(timer);
            }
        }, [flag]);

        const calculatedValue = React.useMemo(
            () => getDateByType(date, picker),
            [date, picker]
        );

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Tab") return;
            e.preventDefault();
            if (e.key === "ArrowRight") onRightFocus?.();
            if (e.key === "ArrowLeft") onLeftFocus?.();
            if (["ArrowUp", "ArrowDown"].includes(e.key)) {
                const step = e.key === "ArrowUp" ? 1 : -1;
                const newValue = getArrowByType(calculatedValue, step, picker);
                if (flag) setFlag(false);
                const tempDate = new Date(date);
                setDate(setDateByType(tempDate, newValue, picker));
            }
            if (e.key >= "0" && e.key <= "9") {
                const newValue = !flag
                    ? "0" + e.key
                    : calculatedValue.slice(1, 2) + e.key;
                if (flag) onRightFocus?.();
                setFlag((prev) => !prev);
                const tempDate = new Date(date);
                setDate(setDateByType(tempDate, newValue, picker));
            }
        };

        return (
            <Input
                ref={ref}
                id={id || picker}
                name={name || picker}
                className={cn(
                    "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
                    className
                )}
                value={value || calculatedValue}
                onChange={(e) => {
                    e.preventDefault();
                    onChange?.(e);
                }}
                type={type}
                inputMode="decimal"
                onKeyDown={(e) => {
                    onKeyDown?.(e);
                    handleKeyDown(e);
                }}
                {...props}
            />
        );
    }
);

TimePickerInput.displayName = "TimePickerInput";



/**
 * regular expression to check for valid hour format (01-23)
 */
export function isValidHour(value: string) {
    return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value: string) {
    return /^(0[1-9]|1[0-2])$/.test(value);
}

/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(value: string) {
    return /^[0-5][0-9]$/.test(value);
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };

export function getValidNumber(
    value: string,
    { max, min = 0, loop = false }: GetValidNumberConfig
) {
    let numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
        if (!loop) {
            if (numericValue > max) numericValue = max;
            if (numericValue < min) numericValue = min;
        } else {
            if (numericValue > max) numericValue = min;
            if (numericValue < min) numericValue = max;
        }
        return numericValue.toString().padStart(2, "0");
    }

    return "00";
}

export function getValidHour(value: string) {
    if (isValidHour(value)) return value;
    return getValidNumber(value, { max: 23 });
}

export function getValid12Hour(value: string) {
    if (isValid12Hour(value)) return value;
    return getValidNumber(value, { max: 12 });
}

export function getValidMinuteOrSecond(value: string) {
    if (isValidMinuteOrSecond(value)) return value;
    return getValidNumber(value, { max: 59 });
}

type GetValidArrowNumberConfig = {
    min: number;
    max: number;
    step: number;
};

export function getValidArrowNumber(
    value: string,
    { min, max, step }: GetValidArrowNumberConfig
) {
    let numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
        numericValue += step;
        return getValidNumber(String(numericValue), { min, max, loop: true });
    }
    return "00";
}

export function getValidArrowHour(value: string, step: number) {
    return getValidArrowNumber(value, { min: 0, max: 23, step });
}

export function getValidArrowMinuteOrSecond(value: string, step: number) {
    return getValidArrowNumber(value, { min: 0, max: 59, step });
}

export function setMinutes(date: Date, value: string) {
    const minutes = getValidMinuteOrSecond(value);
    date.setMinutes(parseInt(minutes, 10));
    return date;
}

export function setSeconds(date: Date, value: string) {
    const seconds = getValidMinuteOrSecond(value);
    date.setSeconds(parseInt(seconds, 10));
    return date;
}

export function setHours(date: Date, value: string) {
    const hours = getValidHour(value);
    date.setHours(parseInt(hours, 10));
    return date;
}

export type TimePickerType = "minutes" | "seconds" | "hours"; // | "12hours";

export function setDateByType(date: Date, value: string, type: TimePickerType) {
    switch (type) {
        case "minutes":
            return setMinutes(date, value);
        case "seconds":
            return setSeconds(date, value);
        case "hours":
            return setHours(date, value);
        default:
            return date;
    }
}

export function getDateByType(date: Date, type: TimePickerType) {
    switch (type) {
        case "minutes":
            return getValidMinuteOrSecond(String(date.getMinutes()));
        case "seconds":
            return getValidMinuteOrSecond(String(date.getSeconds()));
        case "hours":
            return getValidHour(String(date.getHours()));
        default:
            return "00";
    }
}

export function getArrowByType(
    value: string,
    step: number,
    type: TimePickerType
) {
    switch (type) {
        case "minutes":
            return getValidArrowMinuteOrSecond(value, step);
        case "seconds":
            return getValidArrowMinuteOrSecond(value, step);
        case "hours":
            return getValidArrowHour(value, step);
        default:
            return "00";
    }
}