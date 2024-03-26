import { Button } from "./ui/button";
import { Card } from "./ui/card";

type DateCarouselProps =  {
    selectedDate: Date,
    setSelectedDate: (date: Date) => void
}

export function DateCarousel({selectedDate, setSelectedDate}: DateCarouselProps) {
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

    return (
        <Card className="flex items-center p-2">
            <Button onClick={onPrev}>Prev</Button>
            <div>{selectedDate.toLocaleDateString()}</div>
            <Button onClick={onNext}>Next</Button>            

        </Card>
    )
}