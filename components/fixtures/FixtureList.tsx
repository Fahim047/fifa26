"use client";

import { Match } from "@/types";
import { FixtureCard } from "./FixtureCard";
import { motion } from "motion/react";

interface FixtureListProps {
  fixtures: Match[];
}

export function FixtureList({ fixtures }: FixtureListProps) {
  if (fixtures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">⚽</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          No matches found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  // Group fixtures by date
  const fixturesByDate = fixtures.reduce((acc, fixture) => {
    const date = fixture.date || "TBD";
    if (!acc[date]) acc[date] = [];
    acc[date].push(fixture);
    return acc;
  }, {} as Record<string, Match[]>);

  const sortedDates = Object.keys(fixturesByDate).sort();

  return (
    <div className="space-y-12">
      {sortedDates.map((date, dateIdx) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dateIdx * 0.1 }}
        >
          {/* Date Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              {formatDateHeader(date)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {fixturesByDate[date].length} match
              {fixturesByDate[date].length !== 1 ? "es" : ""}
            </p>
          </div>

          {/* Match Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixturesByDate[date].map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: dateIdx * 0.1 + idx * 0.05 }}
              >
                <FixtureCard match={match} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function formatDateHeader(dateStr: string): string {
  if (dateStr === "TBD") return "To Be Determined";

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
