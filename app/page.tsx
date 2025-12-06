"use client";

import { BracketView } from "@/components/bracket/BracketView";
import { TournamentControls } from "@/components/controls/TournamentControls";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Controls Sidebar */}
      <div className="relative z-10 h-screen flex-shrink-0 shadow-2xl">
        <TournamentControls />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 h-screen overflow-hidden bg-background/50">
        <BracketView />
      </div>
    </main>
  );
}
