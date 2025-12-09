"use client";

import { useState, useMemo } from "react";
import {
  FixtureFilters,
  type FilterValues,
} from "@/components/fixtures/fixture-filters";
import { FixtureList } from "@/components/fixtures/fixture-list";
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

  const allFixtures = useMemo(() => getAllFixtures(), []);
  const dates = useMemo(() => getUniqueDates(allFixtures), [allFixtures]);
  const venues = useMemo(() => getUniqueVenues(allFixtures), [allFixtures]);
  const cities = useMemo(() => getUniqueCities(allFixtures), [allFixtures]);
  const teams = useMemo(() => getAllTeams(), []);

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            Fixtures
          </h1>
          <p className="text-muted-foreground">
            {filteredFixtures.length} of {allFixtures.length} matches
          </p>
        </motion.div>

        {/* Filters */}
        <FixtureFilters
          dates={dates}
          venues={venues}
          cities={cities}
          teams={teams}
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Fixtures List */}
        <FixtureList fixtures={filteredFixtures} />
      </div>
    </main>
  );
}
