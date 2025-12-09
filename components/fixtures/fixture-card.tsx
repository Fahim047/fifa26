"use client";

import type { Match } from "@/types";
import { MapPin, Clock } from "lucide-react";
import { convertToLocalTime } from "@/lib/fixtures-data";

interface FixtureCardProps {
  match: Match;
}

export function FixtureCard({ match }: FixtureCardProps) {
  const localTime =
    match.date && match.time
      ? convertToLocalTime(match.date, match.time)
      : null;

  return (
    <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-foreground/20 transition-all duration-200">
      {/* Round badge */}
      <div className="absolute top-4 right-4">
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
          {match.round}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Home Team */}
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground">
            {match.homeTeam?.code?.slice(0, 2) || "?"}
          </div>
          <p className="text-sm font-medium text-foreground truncate">
            {match.homeTeam?.name || "TBD"}
          </p>
          <p className="text-xs text-muted-foreground">
            {match.homeTeam?.code || "-"}
          </p>
        </div>

        {/* VS divider */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-muted-foreground tracking-wider">
            VS
          </span>
        </div>

        {/* Away Team */}
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground">
            {match.awayTeam?.code?.slice(0, 2) || "?"}
          </div>
          <p className="text-sm font-medium text-foreground truncate">
            {match.awayTeam?.name || "TBD"}
          </p>
          <p className="text-xs text-muted-foreground">
            {match.awayTeam?.code || "-"}
          </p>
        </div>
      </div>

      {/* Match info */}
      <div className="space-y-2 pt-4 border-t border-border">
        {match.venue && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">
              {match.venue}, {match.city}
            </span>
          </div>
        )}
        {localTime && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{localTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
