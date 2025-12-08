"use client";

import { Match, Team } from "@/types";
import { convertToLocalTime } from "@/lib/fixtures-data";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

interface FixtureCardProps {
  match: Match;
}

export function FixtureCard({ match }: FixtureCardProps) {
  const localTime = convertToLocalTime(match.date || "", match.time);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group"
    >
      <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-2 border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl">
        {/* Match Number & Round */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Match {match.matchNumber}
          </span>
          <span className="text-xs font-semibold text-primary">
            {getRoundLabel(match.round)}
          </span>
        </div>

        {/* Teams */}
        <div className="space-y-3 mb-4">
          <TeamRow team={match.homeTeam} />
          <div className="flex items-center justify-center">
            <span className="text-muted-foreground font-bold">vs</span>
          </div>
          <TeamRow team={match.awayTeam} />
        </div>

        {/* Match Info */}
        <div className="pt-4 border-t border-border/50 space-y-2">
          {/* Date & Time */}
          {match.date && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">📅</span>
              <span className="font-medium text-foreground">
                {formatDate(match.date)}
              </span>
              {localTime && (
                <span className="text-muted-foreground ml-auto font-mono">
                  {localTime}
                </span>
              )}
            </div>
          )}

          {/* Venue */}
          {match.venue && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">🏟️</span>
              <span className="text-foreground">{match.venue}</span>
            </div>
          )}

          {/* City */}
          {match.city && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">📍</span>
              <span className="text-muted-foreground">{match.city}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function TeamRow({ team }: { team?: Team }) {
  if (!team) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-lg">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground">
          ?
        </div>
        <span className="text-muted-foreground font-medium">TBD</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-transparent rounded-lg group-hover:from-primary/20 transition-colors">
      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
        {team.code}
      </div>
      <span className="font-semibold text-foreground">{team.name}</span>
    </div>
  );
}

function getRoundLabel(round: string): string {
  switch (round) {
    case "Group":
      return "Group Stage";
    case "R32":
      return "Round of 32";
    case "R16":
      return "Round of 16";
    case "QF":
      return "Quarter Finals";
    case "SF":
      return "Semi Finals";
    case "Final":
      return "Final";
    default:
      return round;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
