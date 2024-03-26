"use client";

import { api } from "@/trpc/react";
import { MultibetForm } from "./multibet-form";
import { DateCarousel } from "@/components/date-carousel";
import { useState } from "react";

function BetsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { data: matchesWithBets, isLoading: isLoadingMatchesWithBets } = api.match.getListWithCurrentUserBets.useQuery({date: selectedDate});

  if(!matchesWithBets){
    return <div> Loading... </div>
  }
  return (
    <div>
      <h1>My Bets</h1>
      <DateCarousel selectedDate={selectedDate} setSelectedDate={setSelectedDate}></DateCarousel>
      <MultibetForm matches={matchesWithBets}></MultibetForm>
    </div>
  )
}

export default BetsPage