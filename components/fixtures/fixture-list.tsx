"use client";

import type { Match } from "@/types";
import { FixtureCard } from "./fixture-card";
import { motion } from "motion/react";

interface FixtureListProps {
  fixtures: Match[];
}

export function FixtureList({ fixtures }: FixtureListProps) {
  if (fixtures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No matches found
        </h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters
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

  const formatDateHeader = (dateStr: string): string => {
    if (dateStr === "TBD") return "To Be Determined";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-10">
      {sortedDates.map((date, dateIdx) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dateIdx * 0.05 }}
        >
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-foreground">
              {formatDateHeader(date)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {fixturesByDate[date].length} match
              {fixturesByDate[date].length !== 1 ? "es" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fixturesByDate[date].map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: dateIdx * 0.05 + idx * 0.02 }}
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
