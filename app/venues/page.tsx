"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { MapPin, Building2, Globe } from "lucide-react";
import {
  VENUES,
  getVenuesByCountry,
  getTotalCapacity,
  getTotalMatches,
} from "@/lib/venues-data";
import { VenueCard } from "@/components/venues/VenueCard";
import { VenueFilters, FilterValues } from "@/components/venues/VenueFilters";

export default function VenuesPage() {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    country: "All",
  });

  // Filter venues based on search and country
  const filteredVenues = useMemo(() => {
    let venues = getVenuesByCountry(filters.country);

    if (filters.search) {
      const lowercaseQuery = filters.search.toLowerCase();
      venues = venues.filter(
        (v) =>
          v.name.toLowerCase().includes(lowercaseQuery) ||
          v.city.toLowerCase().includes(lowercaseQuery) ||
          v.country.toLowerCase().includes(lowercaseQuery)
      );
    }

    return venues;
  }, [filters]);

  // Calculate stats
  const totalVenues = VENUES.length;
  const totalCapacity = getTotalCapacity();
  const totalMatches = getTotalMatches();
  const showingVenues = filteredVenues.length;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-green-600/30 via-blue-600/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-linear-to-tl from-purple-600/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500/20 to-green-500/20 rounded-full border border-purple-500/30 mb-6 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="text-sm">FIFA World Cup 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            <span className="bg-linear-to-r from-yellow-600 to-violet-600 bg-clip-text text-transparent">
              World-Class Venues
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Explore the {totalVenues} spectacular stadiums across USA, Canada,
            and Mexico hosting the world&apos;s greatest football tournament
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="border border-slate-800 px-6 py-3 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-foreground">
                  {totalVenues} Stadiums
                </span>
              </div>
            </div>
            <div className="border border-slate-800 px-6 py-3 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-foreground">
                  {totalMatches} Matches
                </span>
              </div>
            </div>
            <div className="border border-slate-800 px-6 py-3 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="font-semibold text-foreground">
                  3 Countries
                </span>
              </div>
            </div>
            {(filters.search || filters.country !== "All") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-blue-500/30 px-6 py-3 rounded-full backdrop-blur-sm"
              >
                <span className="font-semibold text-blue-300">
                  Showing {showingVenues}
                </span>
              </motion.div>
            )}
          </div>

          {/* Total Capacity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <p className="text-sm text-muted-foreground">
              Combined capacity:{" "}
              <span className="font-bold text-foreground">
                {totalCapacity.toLocaleString()}
              </span>{" "}
              fans
            </p>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <VenueFilters onFilterChange={setFilters} />

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <VenueCard key={venue.id} venue={venue} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No venues found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
