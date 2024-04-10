import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { DatePickerDemo } from "./ui/date-picker-demo";
import { TimePickerDemo } from "./ui/time-picker-demo";

type DateCarouselProps = {
    selectedDate: Date,
    setSelectedDate: (date: Date) => void
}

export function DateCarousel({ selectedDate, setSelectedDate }: DateCarouselProps) {
    const onNext = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(nextDate);
    };

    const onPrev = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    function setDate(date: Date | undefined) {
        if (date) {
            setSelectedDate(date);
        }
    }

    return (
        <Card className="flex items-center p-2">
            <Button onClick={onPrev}>Prev</Button>
            <DatePickerDemo date={selectedDate} setDate={setDate}></DatePickerDemo>
            <Button onClick={onNext}>Next</Button>

        </Card>
    )
}