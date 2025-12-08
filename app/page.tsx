"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
  Users,
  Tv,
  MapPin,
  ArrowRight,
  TrophyIcon,
} from "lucide-react";

export default function FIFA2026Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Live Matches",
      desc: "Real-time scores, play-by-play, and instant highlights",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      title: "Standings & Stats",
      desc: "Complete tournament brackets, team rankings, and player stats",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Tv,
      title: "Video Hub",
      desc: "Watch goals, interviews, analysis, and exclusive content",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: MapPin,
      title: "Stadium Guide",
      desc: "Explore all 16 venues across USA, Canada, and Mexico",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Fan Zone",
      desc: "Join global communities, predict matches, and compete",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    { number: "48", label: "Teams" },
    { number: "104", label: "Matches" },
    { number: "16", label: "Stadiums" },
    { number: "3", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-purple-950/40 to-pink-950/40"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-300">
                Kicking off June 11, 2026
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                The World's
              </span>
              <br />
              <span className="text-white">Greatest Football</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Your ultimate destination for FIFA World Cup 2026. Live scores,
              exclusive content, stadium tours, and everything football in one
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl shadow-purple-500/40 flex items-center gap-3">
                Fixtures
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <TrophyIcon />
                </div>
                Predict Champ
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Nations Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Three Nations,
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                One Historic Tournament
              </span>
            </h3>
            <p className="text-slate-400 text-lg mb-2">FIFA World Cup 2026</p>
            <p className="text-slate-500 text-sm">
              48 teams • 16 host cities • 104 matches
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Canada */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4">🇨🇦</div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                  Canada
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  2 Host Cities • 13 Matches
                </p>
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>Toronto, Vancouver</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mexico */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4">🇲🇽</div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Mexico
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  3 Host Cities • 13 Matches
                </p>
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>Mexico City, Guadalajara, Monterrey</span>
                  </div>
                </div>
              </div>
            </div>

            {/* USA */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4">🇺🇸</div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  United States
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  11 Host Cities • 78 Matches
                </p>
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>New York, Los Angeles, Dallas, and more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all duration-300">
              Explore All Venues
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need,
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                One Platform
              </span>
            </h3>
            <p className="text-slate-400 text-lg">
              Immersive features designed for the ultimate fan experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>

                <h4 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>

                <ArrowRight
                  className={`w-5 h-5 mt-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300 ${
                    hoveredFeature === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>
            Made with ❤️ by
            <a
              href="https://fifolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline ml-1"
            >
              Fahimul.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
