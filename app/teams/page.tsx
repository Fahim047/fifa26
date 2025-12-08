"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Trophy, Users } from "lucide-react";
import { INITIAL_GROUPS } from "@/lib/data";
import { TeamCard } from "@/components/teams/TeamCard";
import { GroupView } from "@/components/teams/GroupView";
import {
  TeamFilters,
  ViewMode,
  FilterValues,
} from "@/components/teams/TeamFilters";

export default function TeamsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("groups");
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    group: "",
  });

  // Get all teams from groups
  const allTeams = useMemo(() => {
    return INITIAL_GROUPS.flatMap((group) =>
      group.teams.map((team) => ({ ...team, groupId: group.id }))
    );
  }, []);

  // Get unique group IDs
  const groupIds = useMemo(() => {
    return INITIAL_GROUPS.map((g) => g.id);
  }, []);

  // Filter teams based on search and group
  const filteredTeams = useMemo(() => {
    return allTeams.filter((team) => {
      const matchesSearch =
        !filters.search ||
        team.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        team.code.toLowerCase().includes(filters.search.toLowerCase());

      const matchesGroup = !filters.group || team.groupId === filters.group;

      return matchesSearch && matchesGroup;
    });
  }, [allTeams, filters]);

  // Filter groups for group view
  const filteredGroups = useMemo(() => {
    if (!filters.search && !filters.group) {
      return INITIAL_GROUPS;
    }

    return INITIAL_GROUPS.map((group) => ({
      ...group,
      teams: group.teams.filter((team) => {
        const matchesSearch =
          !filters.search ||
          team.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          team.code.toLowerCase().includes(filters.search.toLowerCase());

        const matchesGroup = !filters.group || group.id === filters.group;

        return matchesSearch && matchesGroup;
      }),
    })).filter((group) => group.teams.length > 0);
  }, [filters]);

  // Calculate stats
  const totalTeams = allTeams.length;
  const totalGroups = INITIAL_GROUPS.length;
  const showingTeams = filteredTeams.length;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/30 via-purple-600/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-pink-600/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-6 backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">FIFA World Cup 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Participating Teams
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Meet all {totalTeams} teams competing across {totalGroups} groups in
            the most exciting World Cup ever
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 px-6 py-3 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-foreground">
                  {totalTeams} Teams
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 px-6 py-3 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-foreground">
                  {totalGroups} Groups
                </span>
              </div>
            </div>
            {(filters.search || filters.group) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 px-6 py-3 rounded-full backdrop-blur-sm"
              >
                <span className="font-semibold text-blue-300">
                  Showing {showingTeams}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <TeamFilters
          groups={groupIds}
          onFilterChange={setFilters}
          onViewChange={setViewMode}
          currentView={viewMode}
        />

        {/* Teams Display */}
        {viewMode === "groups" ? (
          <GroupView groups={filteredGroups} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredTeams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTeams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                  >
                    <TeamCard team={team} groupId={team.groupId} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No teams found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
