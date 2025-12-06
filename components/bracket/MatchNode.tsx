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

  // Placeholder
  if (!match.homeTeam && !match.awayTeam) {
    return (
      <div
        className={cn(
          "w-64 h-24 rounded-xl border border-dashed border-border bg-muted/20 flex items-center justify-center",
          className
        )}
      >
        <span className="text-muted-foreground font-medium text-xs uppercase tracking-widest">
          TBD
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col w-64 relative group z-10", className)}>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-0.5 hover:shadow-primary/10">
        {/* Home Team */}
        <div
          onClick={() => match.homeTeam && onMatchClick(match, match.homeTeam)}
          className={cn(
            "h-12 px-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-b border-border hover:bg-muted/50",
            match.winner?.id === match.homeTeam?.id
              ? "bg-gradient-to-r from-primary/20 to-primary/10"
              : "",
            match.winner && match.winner.id !== match.homeTeam?.id
              ? "opacity-40 grayscale"
              : ""
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-1 h-1 rounded-full",
                match.winner?.id === match.homeTeam?.id
                  ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                  : "bg-muted-foreground"
              )}
            ></div>
            <span
              className={cn(
                "font-medium text-sm tracking-wide",
                match.winner?.id === match.homeTeam?.id
                  ? "text-primary-foreground dark:text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {match.homeTeam?.name || "TBD"}
            </span>
          </div>
          {match.winner?.id === match.homeTeam?.id && (
            <span className="text-primary text-xs font-bold">WIN</span>
          )}
        </div>

        {/* Away Team */}
        <div
          onClick={() => match.awayTeam && onMatchClick(match, match.awayTeam)}
          className={cn(
            "h-12 px-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-muted/50",
            match.winner?.id === match.awayTeam?.id
              ? "bg-gradient-to-r from-primary/20 to-primary/10"
              : "",
            match.winner && match.winner.id !== match.awayTeam?.id
              ? "opacity-40 grayscale"
              : ""
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-1 h-1 rounded-full",
                match.winner?.id === match.awayTeam?.id
                  ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                  : "bg-muted-foreground"
              )}
            ></div>
            <span
              className={cn(
                "font-medium text-sm tracking-wide",
                match.winner?.id === match.awayTeam?.id
                  ? "text-primary-foreground dark:text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {match.awayTeam?.name || "TBD"}
            </span>
          </div>
          {match.winner?.id === match.awayTeam?.id && (
            <span className="text-primary text-xs font-bold">WIN</span>
          )}
        </div>
      </div>
    </div>
  );
}
