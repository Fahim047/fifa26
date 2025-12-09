"use client";

import type { Team } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterValues {
  date: string;
  venue: string;
  city: string;
  team: string;
}

interface FixtureFiltersProps {
  dates: string[];
  venues: string[];
  cities: string[];
  teams: Team[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export function FixtureFilters({
  dates,
  venues,
  cities,
  teams,
  filters,
  onFilterChange,
}: FixtureFiltersProps) {
  const hasActiveFilters =
    filters.date || filters.venue || filters.city || filters.team;

  const clearFilters = () => {
    onFilterChange({ date: "", venue: "", city: "", team: "" });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <Select
        value={filters.date}
        onValueChange={(value) =>
          onFilterChange({ ...filters, date: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[140px] bg-card border-border">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Dates</SelectItem>
          {dates.map((date) => (
            <SelectItem key={date} value={date}>
              {formatDate(date)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.venue}
        onValueChange={(value) =>
          onFilterChange({ ...filters, venue: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Venue" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Venues</SelectItem>
          {venues.map((venue) => (
            <SelectItem key={venue} value={venue}>
              {venue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.city}
        onValueChange={(value) =>
          onFilterChange({ ...filters, city: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[160px] bg-card border-border">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.team}
        onValueChange={(value) =>
          onFilterChange({ ...filters, team: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[160px] bg-card border-border">
          <SelectValue placeholder="Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teams</SelectItem>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
