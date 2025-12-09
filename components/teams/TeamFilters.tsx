"use client";

import { useState } from "react";
import { Search, Grid3x3, List, X } from "lucide-react";
import { motion } from "motion/react";

export type ViewMode = "grid" | "groups";

export interface FilterValues {
  search: string;
  group: string;
}

interface TeamFiltersProps {
  groups: string[];
  onFilterChange: (filters: FilterValues) => void;
  onViewChange: (view: ViewMode) => void;
  currentView: ViewMode;
}

export function TeamFilters({
  groups,
  onFilterChange,
  onViewChange,
  currentView,
}: TeamFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, group: selectedGroup });
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    onFilterChange({ search, group: value });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedGroup("");
    onFilterChange({ search: "", group: "" });
  };

  const hasActiveFilters = search || selectedGroup;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 space-y-4"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-800 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Group Filter */}
        <div className="relative min-w-[200px]">
          <select
            value={selectedGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
            className="w-full px-4 py-3 border border-slate-800 rounded-xl focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm text-foreground appearance-none cursor-pointer"
          >
            <option value="">All Groups</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                Group {group}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 border border-slate-800 rounded-xl p-1 backdrop-blur-sm">
          <button
            onClick={() => onViewChange("grid")}
            className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
              currentView === "grid"
                ? "text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {currentView === "grid" && (
              <motion.div
                layoutId="view-indicator"
                className="absolute inset-0 bg-yellow-600 rounded-lg"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </span>
          </button>
          <button
            onClick={() => onViewChange("groups")}
            className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
              currentView === "groups"
                ? "text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {currentView === "groups" && (
              <motion.div
                layoutId="view-indicator"
                className="absolute inset-0 bg-violet-600 rounded-lg"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </span>
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearFilters}
            className="px-4 py-2 border border-slate-800 rounded-xl hover:border-red-500/50 transition-all duration-300 text-red-400 hover:text-red-300 flex items-center gap-2 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </motion.button>
        )}
      </div>

      {/* Active Filters Indicator */}
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
            {selectedGroup && (
              <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400">
                Group {selectedGroup}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
