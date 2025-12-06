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
  const [showChampionModal, setShowChampionModal] = useState(false);
  const bracketRef = useRef<HTMLDivElement>(null);
  const championModalRef = useRef<HTMLDivElement>(null);
  const lastChampionId = useRef<string | null>(null);

  // Reload bracket when standings or bestThirds change
  useEffect(() => {
    const allRounds = generateFullBracket(
      standings,
      bestThirds,
      matchDecisions
    );
    setRounds(allRounds);

    const winner = allRounds["Final"]?.[0]?.winner;
    if (winner) {
      // Only show modal if this is a NEW winner
      if (winner.id !== lastChampionId.current) {
        lastChampionId.current = winner.id;
        // Small delay to let animation finish or just feel natural
        const timer = setTimeout(() => setShowChampionModal(true), 500);
        return () => clearTimeout(timer);
      }
    } else {
      // Reset if winner is cleared (backtracked)
      lastChampionId.current = null;
    }
  }, [standings, bestThirds, matchDecisions]);

  // Handler for when a user selects a winner in a match
  const handleMatchClick = (match: Match, winner: Team) => {
    // Save decision to store
    setMatchDecision(match.id, winner.id);
    // Store updates -> useEffect triggers -> Recalculates bracket
  };

  const handleReset = () => {
    if (confirm("Reset all predictions? This will clear everything.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleDownload = async () => {
    if (bracketRef.current) {
      try {
        const dataUrl = await toPng(bracketRef.current, {
          backgroundColor: "#020617",
          width: bracketRef.current.scrollWidth,
          height: bracketRef.current.scrollHeight,
          style: {
            overflow: "visible",
          },
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

  const handleChampionDownload = async () => {
    if (championModalRef.current) {
      try {
        const dataUrl = await toPng(championModalRef.current, {
          backgroundColor: "#000000",
          filter: (node) => {
            return !node.classList?.contains("noprint");
          },
          style: {
            transform: "scale(1)",
          },
        });
        const link = document.createElement("a");
        link.download = "fifa-2026-champion.png";
        link.href = dataUrl;
        link.click();
        setShowChampionModal(false);
      } catch (err) {
        console.error("Failed to generate champion image", err);
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
    <div className="w-full h-full overflow-hidden flex flex-col bg-background">
      <div className="flex justify-between items-center p-4 border-b border-border bg-card/50 backdrop-blur-sm z-20 shadow-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          FIFA 26
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleReset} variant="destructive" className="gap-2">
            ↺ Reset
          </Button>
          <Button
            onClick={handleDownload}
            variant="secondary"
            className="gap-2"
          >
            <span>📷</span> Save Image
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background p-8" ref={bracketRef}>
        <div className="flex gap-0 min-w-max pb-20 items-stretch">
          {roundOrder.map((roundKey, roundIdx) => {
            if (!rounds[roundKey]) return null;

            return (
              <div key={roundKey} className="flex relative">
                <div className="flex flex-col justify-around gap-4 min-w-[300px] z-10 px-4">
                  <h3 className="text-center font-bold text-muted-foreground mb-4 h-6 sticky top-0 bg-background/80 backdrop-blur-sm">
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
                            <div className="absolute left-0 w-[50%] top-[25%] bottom-[25%] border-r border-t border-b border-muted-foreground/30 rounded-r-none" />
                            {/* The Leader Line to Target */}
                            <div className="absolute right-0 w-[50%] top-[50%] h-[1px] bg-muted-foreground/30" />
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            );
          })}

          {/* Champion Display Integration */}
          {rounds["Final"]?.[0]?.winner && (
            <div className="flex flex-col items-center justify-center p-8 bg-card/50 border-l border-border backdrop-blur-sm min-w-[300px]">
              <div className="text-primary font-bold mb-4 tracking-widest text-sm uppercase">
                Tournament Champion
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="w-32 h-32 bg-card border-2 border-primary/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.3)] relative z-10 p-6">
                    <img
                      src="/trophy.png"
                      alt="Trophy"
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-black text-foreground mb-1">
                    {rounds["Final"][0].winner.name}
                  </h2>
                  <div className="text-primary font-medium tracking-wide">
                    2026 WORLD CUP WINNER
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {showChampionModal && rounds["Final"]?.[0]?.winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4"
        >
          <div className="bg-gradient-to-br from-primary to-primary/40 p-1 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/trophy.png')] bg-cover opacity-10 blur-sm mix-blend-overlay"></div>
            <div
              ref={championModalRef}
              className="bg-card/95 rounded-xl p-12 text-center border border-primary/20 relative z-10 min-w-[400px]"
            >
              <h1 className="text-6xl font-black text-primary mb-4 tracking-tighter">
                CHAMPION
              </h1>

              <Button
                size="icon"
                className="absolute top-4 right-4 bg-transparent hover:bg-muted text-muted-foreground rounded-full noprint"
                onClick={() => setShowChampionModal(false)}
              >
                ✕
              </Button>

              <div className="my-8 flex justify-center">
                <img
                  src="/trophy.png"
                  alt="World Cup Trophy"
                  className="h-48 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                />
              </div>

              <div className="text-4xl font-bold text-foreground mb-8">
                {rounds["Final"][0].winner.name}
              </div>

              <div className="grid grid-cols-2 gap-4 noprint">
                <Button
                  size="lg"
                  className="bg-muted hover:bg-muted/80 text-foreground font-bold"
                  onClick={() => setShowChampionModal(false)}
                >
                  Close
                </Button>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold w-full"
                  onClick={handleChampionDownload}
                >
                  Save Image
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
