"use client";

import { Group } from "@/types";
import { TeamCard } from "./TeamCard";
import { motion } from "motion/react";

interface GroupViewProps {
  groups: Group[];
}

// Gradient colors for group headers
const GROUP_GRADIENTS: Record<string, string> = {
  A: "from-red-500 to-orange-500",
  B: "from-blue-500 to-cyan-500",
  C: "from-green-500 to-emerald-500",
  D: "from-yellow-500 to-amber-500",
  E: "from-purple-500 to-pink-500",
  F: "from-indigo-500 to-blue-500",
  G: "from-pink-500 to-rose-500",
  H: "from-orange-500 to-red-500",
  I: "from-cyan-500 to-blue-500",
  J: "from-emerald-500 to-green-500",
  K: "from-violet-500 to-purple-500",
  L: "from-amber-500 to-orange-500",
};

export function GroupView({ groups }: GroupViewProps) {
  return (
    <div className="space-y-12">
      {groups.map((group, groupIndex) => {
        const gradient =
          GROUP_GRADIENTS[group.id] || "from-blue-500 to-purple-500";

        return (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            className="space-y-6"
          >
            {/* Group Header */}
            <div className="relative">
              <div
                className={`absolute inset-0 bg-linear-to-r ${gradient} opacity-10 rounded-2xl blur-xl`}
              />
              <div className="relative backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-3xl font-black text-white">
                        {group.id}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{group.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {group.teams.length} Teams
                      </p>
                    </div>
                  </div>

                  {/* Group Identifier Badge */}
                  <div
                    className={`hidden sm:block px-6 py-2 rounded-full bg-linear-to-r ${gradient} border border-white/10 opacity-80`}
                  >
                    <span className={`text-sm font-semibold bg-clip-text`}>
                      Group Stage
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.teams.map((team, teamIndex) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: groupIndex * 0.1 + teamIndex * 0.05,
                  }}
                >
                  <TeamCard team={team} groupId={group.id} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
