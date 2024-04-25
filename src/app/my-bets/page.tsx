"use client";

import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/react";
import { Stage } from "@prisma/client";
import { isBefore } from "date-fns";
import { useState } from "react";
import { BetForm } from "../_components/bet-form";
import { BetInfo } from "../_components/bet-info";
import { StageSelector } from "./stage-selector";
import { BetsProgress } from "../_components/bets-progress";

function BetsPage() {
  const [selectedStage, setSelectedStage] = useState<Stage>(Stage.G1);
  const { data: matchesWithBets, isLoading: isLoadingMatchesWithBets } = api.match.myBets.useQuery({ stage: selectedStage });


  if (isLoadingMatchesWithBets) {
    return <div> Loading... </div>
  }
  if (!matchesWithBets) {
    return <div> Something went wrong... </div>
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold my-4">Bets</h1>
      <StageSelector stages={Object.values(Stage)} selectedStage={selectedStage} setSelectedStage={(stage) => setSelectedStage(stage)}></StageSelector>
      <BetsProgress matchesWithBets={matchesWithBets}></BetsProgress>
      {
        (!matchesWithBets.length) ? (<div> No matches.</div>) :
          <div>
            {matchesWithBets.map(matchWithBet =>
              <div key={matchWithBet.id} className="my-4">
                {isBefore(new Date(), matchWithBet.startDate) ?
                  <BetForm match={matchWithBet}></BetForm> :
                  <BetInfo match={matchWithBet}></BetInfo>
                }
              </div>
            )}
          </div>
      }
    </div >
  )
}

export default BetsPage