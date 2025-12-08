"use client";

import { useState } from "react";
import { Team } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";

interface FixtureFiltersProps {
  dates: string[];
  venues: string[];
  cities: string[];
  teams: Team[];
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  date: string;
  venue: string;
  city: string;
  team: string;
}

export function FixtureFilters({
  dates,
  venues,
  cities,
  teams,
  onFilterChange,
}: FixtureFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    date: "",
    venue: "",
    city: "",
    team: "",
  });

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { date: "", venue: "", city: "", team: "" };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-2 border-border mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-primary hover:text-primary/80"
            >
              Reset All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">
              Date
            </label>
            <Select
              value={filters.date || "all-dates"}
              onValueChange={(val) =>
                handleFilterChange("date", val === "all-dates" ? "" : val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-dates">All Dates</SelectItem>
                {dates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Venue Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">
              Venue
            </label>
            <Select
              value={filters.venue || "all-venues"}
              onValueChange={(val) =>
                handleFilterChange("venue", val === "all-venues" ? "" : val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Venues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-venues">All Venues</SelectItem>
                {venues.map((venue) => (
                  <SelectItem key={venue} value={venue}>
                    {venue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">
              City
            </label>
            <Select
              value={filters.city || "all-cities"}
              onValueChange={(val) =>
                handleFilterChange("city", val === "all-cities" ? "" : val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cities">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">
              Team
            </label>
            <Select
              value={filters.team || "all-teams"}
              onValueChange={(val) =>
                handleFilterChange("team", val === "all-teams" ? "" : val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-teams">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name} ({team.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
