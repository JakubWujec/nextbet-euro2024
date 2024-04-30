"use client";

import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/react";
import { Stage } from "@prisma/client";
import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { BetForm } from "../_components/bet-form";
import { BetInfo } from "../_components/bet-info";
import { StageSelector } from "./stage-selector";
import { BetsProgress } from "../_components/bets-progress";

function BetsPage() {
  const [selectedStage, setSelectedStage] = useState<Stage>(Stage.G1);
  const { data, isLoading: isLoadingMatchesWithBets } = api.match.myBets.useQuery({ stage: selectedStage });

  useEffect(() => {
    // select stage after first api call
    if (data) {
      setSelectedStage(data.currentStage);
    }
  }, [])

  if (isLoadingMatchesWithBets) {
    return <div> Loading... </div>
  }
  if (!data) {
    return <div> Something went wrong... </div>
  }

  return (
    <>
      <h1 className="text-3xl font-semibold my-4">Bets</h1>
      <StageSelector stages={Object.values(Stage)} selectedStage={selectedStage} setSelectedStage={(stage) => setSelectedStage(stage)}></StageSelector>
      <BetsProgress matchesWithBets={data.bets}></BetsProgress>
      {
        (!data.bets.length) ? (<div> No matches.</div>) :
          <div className="w-full flex flex-wrap justify-center">
            {data.bets.map(matchWithBet =>
              <div key={matchWithBet.id} className="flex my-4 min-w-[300px] max-w-[360px] px-2 min-h-[200px] flex-grow">
                {isBefore(new Date(), matchWithBet.startDate) ?
                  <BetForm match={matchWithBet}></BetForm> :
                  <BetInfo match={matchWithBet}></BetInfo>
                }
              </div>
            )}
          </div>

      }
    </>
  )
}

export default BetsPage