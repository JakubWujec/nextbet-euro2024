"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export function CreateMatchForm() {
  const router = useRouter();
  const [homeTeamId, setHomeTeamId] = useState<number>(0);
  const [awayTeamId, setAwayTeamId] = useState<number>(0);
  const [startDate, setStartDate] = useState(new Date());

  const createMatch = api.match.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form  onSubmit={(e) => {
      e.preventDefault();
      createMatch.mutate({ homeTeamId, awayTeamId, startDate: startDate.toLocaleDateString()});
    }} className="flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex flex-col">
        <label htmlFor="home_team_id" className="text-gray-700">
          Home Team ID:
        </label>
        <input
          type="number"
          id="home_team_id"
          name="home_team_id"
          className="form-input mt-1 border border-gray-300 rounded-md"
          value={homeTeamId}
          onChange={(e) => setHomeTeamId(Number(e.target.value))}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="away_team_id" className="text-gray-700">
          Away Team ID:
        </label>
        <input
          type="number"
          id="away_team_id"
          name="away_team_id"
          className="form-input mt-1 border border-gray-300 rounded-md"
          value={awayTeamId}
          onChange={(e) => setAwayTeamId(Number(e.target.value))}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="start_date" className="text-gray-700">
          Start Date:
        </label>
        <input
          type="datetime-local"
          id="start_date"
          name="start_date"
          className="form-input mt-1 border border-gray-300 rounded-md"
          // value={startDate}
          onChange={(e) => setStartDate(new Date())}
          // required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create Match
      </button>
    </form>
  );
}
