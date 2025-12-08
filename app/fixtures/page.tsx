"use client";

import { useState, useMemo } from "react";
import {
  FixtureFilters,
  FilterValues,
} from "@/components/fixtures/FixtureFilters";
import { FixtureList } from "@/components/fixtures/FixtureList";
import {
  getAllFixtures,
  getUniqueDates,
  getUniqueVenues,
  getUniqueCities,
  getAllTeams,
} from "@/lib/fixtures-data";
import { motion } from "motion/react";

export default function FixturesPage() {
  const [filters, setFilters] = useState<FilterValues>({
    date: "",
    venue: "",
    city: "",
    team: "",
  });

  // Get all fixtures
  const allFixtures = useMemo(() => getAllFixtures(), []);

  // Get filter options
  const dates = useMemo(() => getUniqueDates(allFixtures), [allFixtures]);
  const venues = useMemo(() => getUniqueVenues(allFixtures), [allFixtures]);
  const cities = useMemo(() => getUniqueCities(allFixtures), [allFixtures]);
  const teams = useMemo(() => getAllTeams(), []);

  // Filter fixtures
  const filteredFixtures = useMemo(() => {
    return allFixtures.filter((fixture) => {
      if (filters.date && fixture.date !== filters.date) return false;
      if (filters.venue && fixture.venue !== filters.venue) return false;
      if (filters.city && fixture.city !== filters.city) return false;
      if (filters.team) {
        const hasTeam =
          fixture.homeTeam?.id === filters.team ||
          fixture.awayTeam?.id === filters.team;
        if (!hasTeam) return false;
      }
      return true;
    });
  }, [allFixtures, filters]);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-600/30 via-blue-600/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-600/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-yellow-600 to-violet-600 bg-clip-text text-transparent">
              Fixtures
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete tournament schedule for FIFA World Cup 2026
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="bg-muted px-4 py-2 rounded-full font-semibold">
              {allFixtures.length} Total Matches
            </span>
            <span className="bg-muted px-4 py-2 rounded-full font-semibold">
              {filteredFixtures.length} Showing
            </span>
          </div>
        </motion.div>

        {/* Filters */}
        <FixtureFilters
          dates={dates}
          venues={venues}
          cities={cities}
          teams={teams}
          onFilterChange={setFilters}
        />

        {/* Fixtures List */}
        <FixtureList fixtures={filteredFixtures} />
      </div>
    </main>
  );
}
