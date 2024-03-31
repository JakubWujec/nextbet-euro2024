"use client";

import { DateCarousel } from "@/components/date-carousel";
import { api } from "@/trpc/react";
import { useState } from "react";
import { BetInfo as BetInfo2 } from "./bet-info";
import { isBefore } from "date-fns";
import { BetForm } from "./bet-form";

function BetsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { data: matchesWithBets, isLoading: isLoadingMatchesWithBets } = api.match.getListWithCurrentUserBets.useQuery({ date: selectedDate });

  if (isLoadingMatchesWithBets) {
    return <div> Loading... </div>
  }
  if (!matchesWithBets) {
    return <div> Something went wrong... </div>
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold my-4">Bets</h1>
      <DateCarousel selectedDate={selectedDate} setSelectedDate={setSelectedDate}></DateCarousel>
      {(!matchesWithBets.length) ? (<div> No matches this day.</div>) :
        <div>
          {matchesWithBets.map(matchWithBet =>
            <div key={matchWithBet.id} className="my-4">
              {isBefore(new Date(), matchWithBet.startDate) ?
                <BetForm match={matchWithBet}></BetForm> :
                <BetInfo2 match={matchWithBet}></BetInfo2>
              }
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default BetsPage