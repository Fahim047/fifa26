"use client";

import { Team } from "@/types";
import { motion } from "motion/react";

interface TeamCardProps {
  team: Team;
  groupId?: string;
}

// Flag emoji map for teams
const FLAG_EMOJI: Record<string, string> = {
  mx: "🇲🇽",
  za: "🇿🇦",
  kr: "🇰🇷",
  ca: "🇨🇦",
  qa: "🇶🇦",
  ch: "🇨🇭",
  br: "🇧🇷",
  ma: "🇲🇦",
  ht: "🇭🇹",
  sc: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  us: "🇺🇸",
  py: "🇵🇾",
  au: "🇦🇺",
  de: "🇩🇪",
  cw: "🇨🇼",
  ci: "🇨🇮",
  ec: "🇪🇨",
  nl: "🇳🇱",
  jp: "🇯🇵",
  tn: "🇹🇳",
  be: "🇧🇪",
  eg: "🇪🇬",
  ir: "🇮🇷",
  nz: "🇳🇿",
  es: "🇪🇸",
  cv: "🇨🇻",
  sa: "🇸🇦",
  uy: "🇺🇾",
  fr: "🇫🇷",
  sn: "🇸🇳",
  no: "🇳🇴",
  ar: "🇦🇷",
  dz: "🇩🇿",
  at: "🇦🇹",
  jo: "🇯🇴",
  pt: "🇵🇹",
  uz: "🇺🇿",
  co: "🇨🇴",
  en: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  hr: "🇭🇷",
  gh: "🇬🇭",
  pa: "🇵🇦",
};

// Gradient colors for different groups
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

export function TeamCard({ team, groupId }: TeamCardProps) {
  const flagEmoji = FLAG_EMOJI[team.id] || "⚽";
  const gradient = groupId
    ? GROUP_GRADIENTS[groupId] || "from-blue-500 to-purple-500"
    : "from-blue-500 to-purple-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        {/* Flag */}
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {flagEmoji}
        </div>

        {/* Team Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {team.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground font-mono">
              {team.code}
            </span>
            {groupId && (
              <>
                <span className="text-muted-foreground">•</span>
                <span
                  className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                >
                  Group {groupId}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
      </div>
    </motion.div>
  );
}
