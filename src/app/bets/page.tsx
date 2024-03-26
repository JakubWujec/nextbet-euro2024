"use client";


import { api } from "@/trpc/react";
import { MultibetForm } from "./multibet-form";

function BetsPage() {
  const { data: matches, isLoading: isLoadingMatches } = api.match.getList.useQuery();

  if(!matches){
    return <div> Loading... </div>
  }
  return (
    <div>
      <h1>My Bets</h1>
      <MultibetForm matches={matches}></MultibetForm>
    </div>
  )
}

export default BetsPage