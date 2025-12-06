"use client";

import { useTournamentStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function TournamentControls() {
  const {
    groups,
    standings,
    setGroupStanding,
    bestThirds,
    setBestThirds,
    setBracketReady,
  } = useTournamentStore();

  // Step 1: Group Standings
  // We only really care about 1st, 2nd, and identifying 3rd.
  // We can just swap teams.

  const handleSwap = (groupId: string, idx1: number, idx2: number) => {
    const currentStandings =
      standings[groupId] || groups.find((g) => g.id === groupId)?.teams!;
    const newStandings = [...currentStandings];
    const temp = newStandings[idx1];
    newStandings[idx1] = newStandings[idx2];
    newStandings[idx2] = temp;
    setGroupStanding(groupId, newStandings);
  };

  // Step 2: Best 3rds
  const allThirds = useMemo(() => {
    return groups.map((g) => {
      const teams = standings[g.id] || g.teams;
      return { team: teams[2], groupId: g.id };
    });
  }, [standings, groups]);

  const toggleThird = (teamId: string) => {
    if (bestThirds.includes(teamId)) {
      setBestThirds(bestThirds.filter((id) => id !== teamId));
    } else {
      if (bestThirds.length < 8) {
        setBestThirds([...bestThirds, teamId]);
      }
    }
  };

  return (
    <div className="w-full md:w-[400px] h-full bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <h2 className="text-xl font-bold text-white">Setup Tournament</h2>
        <p className="text-xs text-muted-foreground">
          Adjust Standings & Pick Top 8 Thirds
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-8">
          {/* Groups */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-400 uppercase text-xs tracking-wider">
              Group Standings
            </h3>
            {groups.map((group) => {
              const teams = standings[group.id] || group.teams;
              return (
                <div
                  key={group.id}
                  className="bg-slate-950 p-3 rounded-lg border border-slate-800/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-300">
                      {group.name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {teams.map((team, idx) => (
                      <div
                        key={team.id}
                        className="flex items-center gap-2 text-sm bg-slate-900 p-1 rounded"
                      >
                        <span
                          className={cn(
                            "w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold",
                            idx === 0
                              ? "bg-yellow-500/20 text-yellow-500"
                              : idx === 1
                              ? "bg-blue-500/20 text-blue-500"
                              : idx === 2
                              ? "bg-orange-500/10 text-orange-500"
                              : "text-slate-600"
                          )}
                        >
                          {idx + 1}
                        </span>
                        <span className="flex-1 truncate">{team.name}</span>
                        {/* Simple Up/Down controls */}
                        <div className="flex gap-0.5">
                          {idx > 0 && (
                            <button
                              onClick={() => handleSwap(group.id, idx, idx - 1)}
                              className="hover:text-white text-slate-500"
                            >
                              ↑
                            </button>
                          )}
                          {idx < 3 && (
                            <button
                              onClick={() => handleSwap(group.id, idx, idx + 1)}
                              className="hover:text-white text-slate-500"
                            >
                              ↓
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Third Place Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-orange-400 uppercase text-xs tracking-wider">
                Best 3rd Place ({bestThirds.length}/8)
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {allThirds.map(({ team, groupId }) => {
                const isSelected = bestThirds.includes(team.id);
                return (
                  <div
                    key={team.id}
                    onClick={() => toggleThird(team.id)}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded cursor-pointer border transition-all",
                      isSelected
                        ? "bg-orange-500/20 border-orange-500/50"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <Checkbox checked={isSelected} />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{team.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Grp {groupId}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold"
          onClick={() => setBracketReady(true)} // In new logic, just refreshes
          disabled={bestThirds.length !== 8}
        >
          {bestThirds.length !== 8
            ? `Select ${8 - bestThirds.length} more`
            : "Update Bracket"}
        </Button>
      </div>
    </div>
  );
}
