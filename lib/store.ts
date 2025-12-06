import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Group, Team, GroupStandings } from "@/types";
import { INITIAL_GROUPS } from "./data";

interface TournamentState {
  standings: GroupStandings;
  groups: Group[];
  bestThirds: string[]; // IDs of the selected best 3rd place teams (max 8)

  setGroupStanding: (groupId: string, teams: Team[]) => void;
  setBestThirds: (teamIds: string[]) => void;

  bracketReady: boolean;
  setBracketReady: (ready: boolean) => void;

  // To track manual bracket progress if needed, though mostly derived
  matchWinners: { [matchId: string]: Team };
  setMatchWinner: (matchId: string, winner: Team) => void;
}

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set) => ({
      groups: INITIAL_GROUPS,
      standings: INITIAL_GROUPS.reduce((acc, group) => {
        acc[group.id] = group.teams;
        return acc;
      }, {} as GroupStandings),
      bestThirds: [],
      bracketReady: false,
      matchWinners: {},

      setGroupStanding: (groupId, teams) =>
        set((state) => ({
          standings: {
            ...state.standings,
            [groupId]: teams,
          },
        })),

      setBestThirds: (teamIds) => set({ bestThirds: teamIds }),

      setBracketReady: (ready) => set({ bracketReady: ready }),

      setMatchWinner: (matchId, winner) =>
        set((state) => ({
          matchWinners: {
            ...state.matchWinners,
            [matchId]: winner,
          },
        })),
    }),
    {
      name: "fifa26-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
