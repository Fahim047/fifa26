"use client";
import { BracketView } from "@/components/bracket/BracketView";
import { TournamentControls } from "@/components/controls/TournamentControls";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col md:flex-row overflow-hidden relative">
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/30 via-purple-600/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-pink-600/20 via-purple-600/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl" />
      </div>
      {/* Controls Sidebar */}
      <div className="relative z-10 w-full md:w-auto h-[50dvh] md:h-screen flex-shrink-0 shadow-2xl border-b md:border-b-0 md:border-r border-border">
        <TournamentControls />
      </div>
      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              FIFA World Cup
            </span>
            <br />
            <span className="text-foreground">2026</span>
          </h1>
      {/* Main Content Area */}
      <div className="relative z-10 flex-1 h-[50dvh] md:h-screen overflow-hidden bg-background/50">
        <BracketView />
      </div>
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
          >
            Your one-stop digital platform for everything FIFA World Cup 2026.
            <br />
            Explore fixtures, predict brackets, and experience the beautiful game.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link href="/fixtures">
              <Button
                size="lg"
                className="text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold"
              >
                View Fixtures ⚽
              </Button>
            </Link>
            <Link href="/bracket">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold border-2"
              >
                Bracket Generator 🏆
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
      {/* Feature Cards */}
      <section className="relative z-10 container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Fixtures Card */}
          <Link href="/fixtures">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-md border-2 border-border hover:border-blue-600/50 rounded-2xl p-8 transition-all cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-4">
                <div className="text-5xl">📅</div>
                <h3 className="text-2xl font-bold text-foreground">
                  Full Tournament Schedule
                </h3>
                <p className="text-muted-foreground">
                  Explore all 104 matches from Group Stage to the Final. Filter by
                  team, venue, date, and see times in your local timezone.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold pt-2">
                  <span>Explore Fixtures</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
          {/* Bracket Card */}
          <Link href="/bracket">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-md border-2 border-border hover:border-purple-600/50 rounded-2xl p-8 transition-all cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-4">
                <div className="text-5xl">🏆</div>
                <h3 className="text-2xl font-bold text-foreground">
                  Bracket Predictor
                </h3>
                <p className="text-muted-foreground">
                  Predict group stage standings and knockout outcomes. Generate
                  your custom tournament bracket and share your predictions.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-semibold pt-2">
                  <span>Create Bracket</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </section>
      {/* Footer Info */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 pb-12 text-center"
      >
        <p className="text-muted-foreground text-sm">
          FIFA World Cup 2026 will be hosted across Canada 🇨🇦, Mexico 🇲🇽, and the USA 🇺🇸
          <br />
          48 teams • 16 host cities • 104 matches
        </p>
      </motion.section>
    </main>
  );
}