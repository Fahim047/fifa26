import Link from "next/link";
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react";
import {
  GROUPS,
  FEATURED_VENUES,
  TOURNAMENT_STATS,
  ROUNDS,
} from "@/lib/tournament-data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              June 11 – July 19, 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            FIFA World Cup
            <span className="block text-muted-foreground">2026</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            The biggest World Cup in history. 48 nations. 16 iconic stadiums.
            Three host countries united for one unforgettable tournament.
          </p>

          {/* Host Nations */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">🇺🇸</span>
              <span className="text-xs text-muted-foreground">USA</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">🇲🇽</span>
              <span className="text-xs text-muted-foreground">Mexico</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">🇨🇦</span>
              <span className="text-xs text-muted-foreground">Canada</span>
            </div>
          </div>

          <Link
            href="/fixtures"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Explore Fixtures
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { value: TOURNAMENT_STATS.teams, label: "Teams" },
              { value: TOURNAMENT_STATS.groups, label: "Groups" },
              { value: TOURNAMENT_STATS.matches, label: "Matches" },
              { value: TOURNAMENT_STATS.venues, label: "Venues" },
              { value: TOURNAMENT_STATS.hostNations, label: "Host Nations" },
              { value: TOURNAMENT_STATS.duration, label: "Duration" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Format */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Tournament Format
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Top 2 from each group advance. Best 8 third-place teams join the
            knockout rounds.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {ROUNDS.map((round, index) => (
              <div key={round} className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium">
                  {round}
                </div>
                {index < ROUNDS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">12 Groups</h2>
              <p className="text-muted-foreground">
                48 teams competing for glory
              </p>
            </div>
            <Link
              href="/bracket"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View Bracket <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GROUPS.map((group) => (
              <div
                key={group.name}
                className="p-4 rounded-xl bg-muted border border-border"
              >
                <div className="text-xs text-muted-foreground mb-3">
                  Group {group.name}
                </div>
                <div className="space-y-2">
                  {group.teams.map((team) => (
                    <div key={team} className="text-sm truncate">
                      {team}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Iconic Venues
              </h2>
              <p className="text-muted-foreground">
                16 world-class stadiums across 3 nations
              </p>
            </div>
            <Link
              href="/venues"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              All Venues <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_VENUES.map((venue) => (
              <Link
                key={venue.name}
                href="/venues"
                className="group p-5 rounded-xl bg-muted border border-border hover:bg-accent hover:border-accent transition-all"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {venue.highlight}
                </div>
                <div className="font-medium mb-1 group-hover:text-foreground transition-colors">
                  {venue.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {venue.city}, {venue.country}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {venue.capacity.toLocaleString()} capacity
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Explore
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/fixtures"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-muted border border-border hover:bg-accent hover:border-accent transition-all"
            >
              <Calendar className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="text-center">
                <div className="font-medium mb-1">Fixtures</div>
                <div className="text-sm text-muted-foreground">104 matches</div>
              </div>
            </Link>

            <Link
              href="/bracket"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-muted border border-border hover:bg-accent hover:border-accent transition-all"
            >
              <Trophy className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="text-center">
                <div className="font-medium mb-1">Bracket</div>
                <div className="text-sm text-muted-foreground">
                  Predict & track
                </div>
              </div>
            </Link>

            <Link
              href="/venues"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-muted border border-border hover:bg-accent hover:border-accent transition-all"
            >
              <MapPin className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="text-center">
                <div className="font-medium mb-1">Venues</div>
                <div className="text-sm text-muted-foreground">16 stadiums</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border text-center text-sm text-muted-foreground">
        Made with ❤️ by{" "}
        <a
          href="https://fifolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Fahimul
        </a>
      </footer>
    </div>
  );
}
