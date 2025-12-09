"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "motion/react";

export interface FilterValues {
  search: string;
  country: "All" | "USA" | "Canada" | "Mexico";
}

interface VenueFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const COUNTRIES = [
  {
    id: "All",
    label: "All Countries",
    flag: "🌎",
    gradient: "from-yellow-400 to-violet-500",
  },
  {
    id: "USA",
    label: "United States",
    flag: "🇺🇸",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "Canada",
    label: "Canada",
    flag: "🇨🇦",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "Mexico",
    label: "Mexico",
    flag: "🇲🇽",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function VenueFilters({ onFilterChange }: VenueFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState<FilterValues["country"]>("All");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, country: selectedCountry });
  };

  const handleCountryChange = (country: FilterValues["country"]) => {
    setSelectedCountry(country);
    onFilterChange({ search, country });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCountry("All");
    onFilterChange({ search: "", country: "All" });
  };

  const hasActiveFilters = search || selectedCountry !== "All";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 space-y-6"
    >
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search stadiums or cities..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-800 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Clear Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearFilters}
            className="px-4 py-3 bg-linear-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-xl hover:border-red-500/50 transition-all duration-300 text-red-400 hover:text-red-300 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* Country Filter Tabs */}
      <div className="flex flex-wrap gap-3">
        {COUNTRIES.map((country) => {
          const isActive = selectedCountry === country.id;
          return (
            <button
              key={country.id}
              onClick={() =>
                handleCountryChange(country.id as FilterValues["country"])
              }
              className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground border border-slate-800 hover:border-slate-700"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="country-indicator"
                  className={`absolute inset-0 bg-linear-to-r ${country.gradient} rounded-xl`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <span className="text-lg">{country.flag}</span>
                <span className="hidden sm:inline">{country.label}</span>
                <span className="sm:hidden">{country.id}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span>Active filters:</span>
          <div className="flex items-center gap-2">
            {search && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400">
                &quot;{search}&quot;
              </span>
            )}
            {selectedCountry !== "All" && (
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400">
                {selectedCountry}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
