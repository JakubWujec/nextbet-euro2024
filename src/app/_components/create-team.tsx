"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export function CreateTeamForm() {
  const router = useRouter();
  const [teamName, setTeamName] = useState<string>("");
  const [teamCode, setTeamCode] = useState<string>("");

  const createTeam = api.team.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTeamCode("");
      setTeamName("");
    },
  });

  return (
    <form
  onSubmit={(e) => {
    e.preventDefault();
    createTeam.mutate({ name: teamName, code: teamCode });
  }}
  className="flex flex-col gap-4 max-w-md mx-auto"
>
  <div className="flex flex-col">
    <label htmlFor="team_name" className="text-gray-700">
      Team Name:
    </label>
    <input
      type="text"
      id="team_name"
      name="team_name"
      className="form-input mt-1 border border-gray-300 rounded-md"
      value={teamName}
      onChange={(e) => setTeamName(e.target.value)}
      required
    />
    </div>
    <div className="flex flex-col">
      <label htmlFor="team_code" className="text-gray-700">
        Team Code (3 characters):
      </label>
      <input
        type="text"
        id="team_code"
        name="team_code"
        className="form-input mt-1 border border-gray-300 rounded-md"
        value={teamCode}
        onChange={(e) => setTeamCode(e.target.value)}
        pattern="[A-Za-z]{3}"
        title="Three letter code (uppercase or lowercase) required"
        required
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Create Team
    </button>
  </form>

  );
}
