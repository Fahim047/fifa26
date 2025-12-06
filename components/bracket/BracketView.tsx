"use client";

import { useEffect, useState } from "react";
import { useTournamentStore } from "@/lib/store";
import { generateBracket } from "@/lib/bracket-logic";
import { Match, Team } from "@/types";
import { MatchNode } from "./MatchNode";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function BracketView() {
  const { standings, bestThirds, setBracketReady } = useTournamentStore();
  const [rounds, setRounds] = useState<{ [key: string]: Match[] }>({});

  // Reload bracket when standings or bestThirds change
  useEffect(() => {
    const r32 = generateBracket(standings, bestThirds);
    setRounds({ R32: r32 });
  }, [standings, bestThirds]);

  // Handler for when a user selects a winner in a match
  const handleMatchClick = (match: Match, winner: Team) => {
    // Deep copy rounds to mutate
    const newRounds = JSON.parse(JSON.stringify(rounds));
    const currentRoundMatches = newRounds[match.round] as Match[];
    const subjectMatch = currentRoundMatches.find(
      (m: Match) => m.id === match.id
    );

    if (subjectMatch) {
      subjectMatch.winner = winner;

      // Logic to propagate to next round
      // In fixtures.json, we have "W73" -> "M89".
      // We can infer next round matches based on the winner codes.
      // BUT since we don't have a full map of the relationship in code yet,
      // We can use the simple "Index based" logic for now OR implement the specific map.

      // Since the user provided specific fixtures for R16, QF etc, we SHOULD use them.
      // But `generateBracket` only generates R32 currently.
      // FIX: We need `generateBracket` to generate the FULL tree structure (empty slots) based on fixtures.json.
      // OR we generate next rounds on the fly.

      // Let's rely on a simplified flow:
      // If next round doesn't exist, create it based on fixtures.json or standard binary tree.
      // Given the complexity of "W73" mapping, let's assume standard binary filling for the View component
      // UNLESS we parse the full JSON structure into the state.

      const nextRoundName = getNextRoundName(match.round);
      if (nextRoundName) {
        if (!newRounds[nextRoundName]) {
          // Initialize next round
          // Should be based on `fixtures.json` if possible?
          // For now, simple binary tree.
          const count = currentRoundMatches.length / 2;
          newRounds[nextRoundName] = Array(count)
            .fill(null)
            .map((_, i) => ({
              id: `${nextRoundName}-${i + 1}`,
              round: nextRoundName,
              homeTeam: null,
              awayTeam: null,
            }));
        }

        // Standard Binary Tree propagation
        const matchIndex = currentRoundMatches.findIndex(
          (m: Match) => m.id === match.id
        );
        const nextMatchIndex = Math.floor(matchIndex / 2);
        const isHomeSlot = matchIndex % 2 === 0;
        const nextMatch = newRounds[nextRoundName][nextMatchIndex];

        if (nextMatch) {
          if (isHomeSlot) nextMatch.homeTeam = winner;
          else nextMatch.awayTeam = winner;
          nextMatch.winner = undefined;
        }
      }
    }

    setRounds(newRounds);
  };

  // ... (keeping helpers)

  const getNextRoundName = (round: string) => {
    if (round === "R32") return "R16";
    if (round === "R16") return "QF";
    if (round === "QF") return "SF";
    if (round === "SF") return "Final";
    return null;
  };

  const getRoundLabel = (roundKey: string) => {
    switch (roundKey) {
      case "R32":
        return "Round of 32";
      case "R16":
        return "Round of 16";
      case "QF":
        return "Quarter Finals";
      case "SF":
        return "Semi Finals";
      case "Final":
        return "Final";
      default:
        return roundKey;
    }
  };

  const roundOrder = ["R32", "R16", "QF", "SF", "Final"];

  return (
    <div className="w-full h-full overflow-x-auto p-8">
      {/* ... keeping layout similar but without back button since it's unified view now */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
        Tournament Path
      </h2>

      <div className="flex gap-12 min-w-max pb-20 items-stretch">
        {roundOrder.map((roundKey, roundIdx) => {
          if (!rounds[roundKey]) return null;

          return (
            <div key={roundKey} className="flex relative">
              <div className="flex flex-col justify-around gap-4 min-w-[250px] z-10">
                <h3 className="text-center font-bold text-slate-400 mb-4 h-6 sticky top-0 bg-slate-950/80 backdrop-blur-sm">
                  {getRoundLabel(roundKey)}
                </h3>
                <div className="flex flex-col justify-around flex-1">
                  {rounds[roundKey].map((match) => (
                    <MatchNode
                      key={match.id}
                      match={match}
                      onMatchClick={handleMatchClick}
                    />
                  ))}
                </div>
              </div>

              {roundIdx < roundOrder.length - 1 &&
                rounds[roundOrder[roundIdx + 1]] && (
                  <div className="w-16 flex flex-col justify-around py-12">
                    {rounds[roundOrder[roundIdx + 1]].map((_, relativeIdx) => (
                      <div
                        key={relativeIdx}
                        className="w-full flex items-center"
                      >
                        <div className="h-[1px] w-full bg-slate-800" />
                      </div>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </div>

      {rounds["Final"]?.[0]?.winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4"
        >
          <div className="bg-gradient-to-br from-yellow-500 to-amber-700 p-1 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/trophy.png')] bg-cover opacity-10 blur-sm mix-blend-overlay"></div>
            <div className="bg-slate-900/90 rounded-xl p-12 text-center border border-yellow-500/30 relative z-10 min-w-[400px]">
              <h1 className="text-6xl font-black text-yellow-500 mb-4 tracking-tighter">
                CHAMPION
              </h1>

              <div className="my-8 flex justify-center">
                <img
                  src="/trophy.png"
                  alt="World Cup Trophy"
                  className="h-48 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                />
              </div>

              <div className="text-4xl font-bold text-white mb-8">
                {rounds["Final"][0].winner.name}
              </div>
              <Button
                size="lg"
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold w-full"
                onClick={() => window.location.reload()}
              >
                New Prediction
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
