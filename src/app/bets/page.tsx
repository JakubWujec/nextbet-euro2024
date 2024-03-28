"use client";

import { api } from "@/trpc/react";
import { MultibetForm } from "./multibet-form";
import { DateCarousel } from "@/components/date-carousel";
import { useState } from "react";

function BetsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { data: matchesWithBets, isLoading: isLoadingMatchesWithBets } = api.match.getListWithCurrentUserBets.useQuery({ date: selectedDate });

  if (!matchesWithBets) {
    return <div> Loading... </div>
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold my-4">Bets</h1>
      <DateCarousel selectedDate={selectedDate} setSelectedDate={setSelectedDate}></DateCarousel>
      {(!matchesWithBets.length) ? (<div> No matches this day.</div>) : 
        <MultibetForm matches={matchesWithBets}></MultibetForm>
      }

    </div>
  )
}

export default BetsPage