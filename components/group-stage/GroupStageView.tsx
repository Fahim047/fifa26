"use client";

import { useTournamentStore } from "@/lib/store";
import { GroupCard } from "./GroupCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function GroupStageView() {
  const { groups, setBracketReady } = useTournamentStore();

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="text-center space-y-4 mb-12">
        <motion.h1
          className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          FIFA World Cup 2026
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Predict the outcome of the group stage to generate your tournament
          bracket.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      <motion.div
        className="flex justify-center pt-8 pb-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          size="lg"
          className="text-xl px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold"
          onClick={() => setBracketReady(true)}
        >
          Generate Bracket →
        </Button>
      </motion.div>
    </div>
  );
}
