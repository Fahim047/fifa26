"use client";

import { BracketView } from "@/components/bracket/BracketView";
import { TournamentControls } from "@/components/controls/TournamentControls";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30 flex overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-3xl" />
      </div>

      {/* Controls Sidebar */}
      <div className="relative z-10 h-screen flex-shrink-0 shadow-2xl">
        <TournamentControls />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 h-screen overflow-hidden bg-slate-950/50">
        <BracketView />
      </div>
    </main>
  );
}
