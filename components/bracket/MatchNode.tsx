"use client";

import { Match, Team } from "@/types";
import { cn } from "@/lib/utils";

interface MatchNodeProps {
  match: Match;
  onMatchClick: (match: Match, winner: Team) => void;
  className?: string;
}

export function MatchNode({ match, onMatchClick, className }: MatchNodeProps) {
  const isDecided = !!match.winner;

  // Render a placeholder if teams aren't determined yet
  if (!match.homeTeam && !match.awayTeam) {
    return (
      <div
        className={cn(
          "w-48 h-24 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-center text-slate-500 text-xs",
          className
        )}
      >
        TBD
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1 w-56 relative group", className)}>
      {/* Connector Line Logic handle in parent/layout usually, or simple CSS here */}

      <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-lg transition-all hover:border-slate-500">
        {/* Home Team */}
        <div
          onClick={() => match.homeTeam && onMatchClick(match, match.homeTeam)}
          className={cn(
            "p-2 flex items-center justify-between cursor-pointer transition-colors hover:bg-slate-800",
            match.winner?.id === match.homeTeam?.id
              ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50"
              : "",
            match.winner && match.winner.id !== match.homeTeam?.id
              ? "opacity-50"
              : ""
          )}
        >
          <div className="flex items-center gap-2">
            {/* Flag placeholder */}
            <span className="w-6 h-4 bg-slate-700 rounded-sm inline-block" />
            <span className="font-semibold text-sm">
              {match.homeTeam?.name || "TBD"}
            </span>
          </div>
          {match.winner?.id === match.homeTeam?.id && (
            <span className="text-green-400 text-xs">✔</span>
          )}
        </div>

        <div className="h-[1px] bg-slate-700 w-full" />

        {/* Away Team */}
        <div
          onClick={() => match.awayTeam && onMatchClick(match, match.awayTeam)}
          className={cn(
            "p-2 flex items-center justify-between cursor-pointer transition-colors hover:bg-slate-800",
            match.winner?.id === match.awayTeam?.id
              ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50"
              : "",
            match.winner && match.winner.id !== match.awayTeam?.id
              ? "opacity-50"
              : ""
          )}
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-4 bg-slate-700 rounded-sm inline-block" />
            <span className="font-semibold text-sm">
              {match.awayTeam?.name || "TBD"}
            </span>
          </div>
          {match.winner?.id === match.awayTeam?.id && (
            <span className="text-green-400 text-xs">✔</span>
          )}
        </div>
      </div>

      <div className="absolute -right-4 top-1/2 w-4 h-[2px] bg-slate-700 hidden group-hover:block" />
    </div>
  );
}
