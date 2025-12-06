"use client";

import { useEffect, useState, useRef } from "react";
import { useTournamentStore } from "@/lib/store";
import { generateFullBracket } from "@/lib/bracket-logic";
import { toPng } from "html-to-image";
import { Match, Team } from "@/types";
import { MatchNode } from "./MatchNode";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function BracketView() {
  const {
    standings,
    bestThirds,
    setBracketReady,
    matchDecisions,
    setMatchDecision,
  } = useTournamentStore();
  const [rounds, setRounds] = useState<{ [key: string]: Match[] }>({});
  const bracketRef = useRef<HTMLDivElement>(null);

  // Reload bracket when standings or bestThirds change
  useEffect(() => {
    const allRounds = generateFullBracket(
      standings,
      bestThirds,
      matchDecisions
    );
    setRounds(allRounds);
  }, [standings, bestThirds, matchDecisions]);

  // Handler for when a user selects a winner in a match
  const handleMatchClick = (match: Match, winner: Team) => {
    // Save decision to store
    setMatchDecision(match.id, winner.id);
    // Store updates -> useEffect triggers -> Recalculates bracket
  };

  const handleDownload = async () => {
    if (bracketRef.current) {
      try {
        const dataUrl = await toPng(bracketRef.current, {
          backgroundColor: "#020617",
        });
        const link = document.createElement("a");
        link.download = "fifa-2026-predictions.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to generate image", err);
      }
    }
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
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950 z-20 shadow-md">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Tournament Path
        </h2>
        <Button onClick={handleDownload} variant="secondary" className="gap-2">
          <span>📷</span> Save Image
        </Button>
      </div>

      <div className="flex-1 overflow-auto bg-slate-950 p-8" ref={bracketRef}>
        <div className="flex gap-0 min-w-max pb-20 items-stretch">
          {roundOrder.map((roundKey, roundIdx) => {
            if (!rounds[roundKey]) return null;

            return (
              <div key={roundKey} className="flex relative">
                <div className="flex flex-col justify-around gap-4 min-w-[300px] z-10 px-4">
                  <h3 className="text-center font-bold text-slate-400 mb-4 h-6 sticky top-0 bg-slate-950/80 backdrop-blur-sm">
                    {getRoundLabel(roundKey)}
                  </h3>
                  <div className="flex flex-col justify-around flex-1">
                    {rounds[roundKey].map((match) => (
                      <MatchNode
                        key={match.id}
                        match={match}
                        onMatchClick={handleMatchClick}
                        className={
                          !match.homeTeam || !match.awayTeam ? "opacity-60" : ""
                        }
                      />
                    ))}
                  </div>
                </div>

                {roundIdx < roundOrder.length - 1 &&
                  rounds[roundOrder[roundIdx + 1]] && (
                    <div className="w-16 flex flex-col justify-around py-12 relative">
                      {/* 
                              Gap Column:
                              Render one connector block for each match in the NEXT round.
                              Because we justify-around, these blocks perfectly align with the Target matches.
                              Inside each block, we draw the fork connecting to the two potential source matches on the left.
                           */}
                      {rounds[roundOrder[roundIdx + 1]].map(
                        (_, relativeIdx) => (
                          <div
                            key={relativeIdx}
                            className="w-full flex items-center justify-center relative h-full"
                          >
                            {/* The Fork */}
                            <div className="absolute left-0 w-[50%] top-[25%] bottom-[25%] border-r border-t border-b border-slate-700 rounded-r-none" />
                            {/* The Leader Line to Target */}
                            <div className="absolute right-0 w-[50%] top-[50%] h-[1px] bg-slate-700" />
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
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
                onClick={() => {
                  if (confirm("Reset all predictions?")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
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
