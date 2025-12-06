"use client";

import { Group } from "@/types";
import { useTournamentStore } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GroupCardProps {
  group: Group;
}

const POSITIONS = ["1st", "2nd", "3rd", "4th"];

export function GroupCard({ group }: GroupCardProps) {
  const { standings, setGroupStanding } = useTournamentStore();
  const groupTeams = standings[group.id] || group.teams;

  const handlePositionChange = (idx: number, teamId: string) => {
    const newOrder = [...groupTeams];
    const currentTeamIdx = newOrder.findIndex((t) => t.id === teamId);

    // Swap logic: if changing pos 0 to Team A, but Team A is at pos 3, swap them.
    // However, simplicity: standard select change.
    // Ideally, we want to select "Who is 1st?", "Who is 2nd?"
    // If we select Team A for 1st, and Team A was 3rd, we swap with whoever was 1st.

    const targetTeam = group.teams.find((t) => t.id === teamId);
    if (!targetTeam) return;

    // Remove target from old position
    const oldIdx = newOrder.findIndex((t) => t.id === teamId);
    if (oldIdx !== -1) {
      // Just swap
      const temp = newOrder[idx];
      newOrder[idx] = newOrder[oldIdx];
      newOrder[oldIdx] = temp;
    }

    setGroupStanding(group.id, newOrder);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-colors bg-white/5 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex justify-between items-center text-primary">
            <span>{group.name}</span>
            <span className="text-xs font-normal text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
              Select positions
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {POSITIONS.map((pos, idx) => {
            const currentTeam = groupTeams[idx];
            return (
              <div key={pos} className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm",
                    idx === 0
                      ? "bg-primary/20 text-primary"
                      : idx === 1
                      ? "bg-muted text-muted-foreground"
                      : "bg-muted/50 text-muted-foreground/50"
                  )}
                >
                  {idx + 1}
                </span>
                <Select
                  value={currentTeam.id}
                  onValueChange={(val) => handlePositionChange(idx, val)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {group.teams.map((team) => (
                      <SelectItem
                        key={team.id}
                        value={team.id}
                        className="cursor-pointer"
                      >
                        <span className="font-semibold">{team.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({team.code})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
