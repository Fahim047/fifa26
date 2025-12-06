"use client";

import { useTournamentStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import ThemeToggler from "../theme-toggler";

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
    <div className="w-full md:w-[400px] h-full bg-muted/30 border-r border-border flex flex-col">
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Setup Tournament
          </h2>
          <p className="text-xs text-muted-foreground">
            Adjust Standings & Pick Top 8 Thirds
          </p>
        </div>
        <ThemeToggler />
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-8">
          {/* Groups */}
          <div className="space-y-4">
            <h3 className="font-semibold uppercase text-xs tracking-wider">
              Group Standings
            </h3>
            {groups.map((group) => {
              const teams = standings[group.id] || group.teams;
              return (
                <div
                  key={group.id}
                  className="bg-card p-3 rounded-lg border border-border shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-foreground">
                      {group.name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {teams.map((team, idx) => (
                      <div
                        key={team.id}
                        className="flex items-center gap-2 text-sm bg-muted/50 p-1 rounded"
                      >
                        <span
                          className={cn(
                            "w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold",
                            idx === 0
                              ? "bg-primary/20 text-primary"
                              : idx === 1
                              ? "bg-secondary text-secondary-foreground"
                              : idx === 2
                              ? "bg-muted text-muted-foreground"
                              : "text-muted-foreground/50"
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
                              className="hover:text-foreground text-muted-foreground"
                            >
                              ↑
                            </button>
                          )}
                          {idx < 3 && (
                            <button
                              onClick={() => handleSwap(group.id, idx, idx + 1)}
                              className="hover:text-foreground text-muted-foreground"
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
              <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
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
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border hover:border-primary/50"
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

      <div className="p-4 border-t border-border bg-card">
        <div
          className={cn(
            "w-full py-3 px-4 rounded-lg text-center font-bold text-sm transition-colors border",
            bestThirds.length === 8
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-muted text-muted-foreground border-border"
          )}
        >
          {bestThirds.length === 8 ? (
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg">✓</span> Bracket Ready
            </span>
          ) : (
            <span>Select {8 - bestThirds.length} more 3rd place teams</span>
          )}
        </div>
      </div>
    </div>
  );
}
