"use client";

import type { Venue } from "@/lib/venues-data";
import { motion } from "motion/react";
import { Users, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface VenueCardProps {
  venue: Venue;
  index: number;
}

const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  Mexico: "🇲🇽",
};

const COUNTRY_STYLES: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  USA: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-700 dark:text-blue-300",
  },
  Canada: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-700 dark:text-red-300",
  },
  Mexico: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-300",
  },
};

const VENUE_IMAGE_MAP: Record<string, { avif: string; webp: string }> = {
  "sofi-stadium": {
    avif: "/venues/sofi-stadium.avif",
    webp: "/venues/sofi-stadium.webp",
  },
  "metlife-stadium": {
    avif: "/venues/metlife-stadium.avif",
    webp: "/venues/metlife-stadium.webp",
  },
  "att-stadium": {
    avif: "/venues/att-stadium.avif",
    webp: "/venues/att-stadium.webp",
  },
  "estadio-azteca": {
    avif: "/venues/estadio-azteca.avif",
    webp: "/venues/estadio-azteca.webp",
  },
  "bmo-field": {
    avif: "/venues/bmo-field.avif",
    webp: "/venues/bmo-field.webp",
  },
  "bc-place": {
    avif: "/venues/bc-place.avif",
    webp: "/venues/bc-place.webp",
  },
  "arrowhead-stadium": {
    avif: "/venues/arrowhead-stadium.avif",
    webp: "/venues/arrowhead-stadium.webp",
  },
  "nrg-stadium": {
    avif: "/venues/nrg-stadium.avif",
    webp: "/venues/nrg-stadium.webp",
  },
  "mercedes-benz-stadium": {
    avif: "/venues/mercedes-benz-stadium.avif",
    webp: "/venues/mercedes-benz-stadium.webp",
  },
  "levis-stadium": {
    avif: "/venues/levis-stadium.avif",
    webp: "/venues/levis-stadium.webp",
  },
  "lincoln-financial-field": {
    avif: "/venues/lincoln-financial-field.avif",
    webp: "/venues/lincoln-financial-field.webp",
  },
  "hard-rock-stadium": {
    avif: "/venues/hard-rock-stadium.avif",
    webp: "/venues/hard-rock-stadium.webp",
  },
  "gillette-stadium": {
    avif: "/venues/gillette-stadium.avif",
    webp: "/venues/gillette-stadium.webp",
  },
  "lumen-field": {
    avif: "/venues/lumen-field.avif",
    webp: "/venues/lumen-field.webp",
  },
  "estadio-bbva": {
    avif: "/venues/estadio-bbva.avif",
    webp: "/venues/estadio-bbva.webp",
  },
  "estadio-akron": {
    avif: "/venues/estadio-akron.avif",
    webp: "/venues/estadio-akron.webp",
  },
};

export function VenueCard({ venue, index }: VenueCardProps) {
  const flag = COUNTRY_FLAGS[venue.country];
  const countryStyle = COUNTRY_STYLES[venue.country];
  const imageUrl = VENUE_IMAGE_MAP[venue.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-xl border bg-card overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
    >
      {/* Stadium Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {imageUrl ? (
          <picture>
            <source srcSet={imageUrl.avif} type="image/avif" />
            <source srcSet={imageUrl.webp} type="image/webp" />

            <Image
              src={imageUrl.webp}
              alt={venue.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </picture>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">🏟️</div>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        <Badge variant="secondary" className="absolute top-3 right-3 shadow-sm">
          <span className="mr-1">{flag}</span>
          <span className="text-xs">{venue.country}</span>
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Stadium Name & City */}
        <div>
          <h3 className="text-lg font-semibold leading-tight mb-1 group-hover:text-primary transition-colors duration-200">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5 group-hover:text-primary transition-colors duration-200" />
            <span>
              {venue.city}
              {venue.state && `, ${venue.state}`}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {venue.capacity.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{venue.matchesHosted} matches</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {venue.features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
            >
              {feature}
            </span>
          ))}
          {venue.features.length > 2 && (
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
              +{venue.features.length - 2}
            </span>
          )}
        </div>

        {/* Year Opened */}
        <div className="pt-2 border-t text-xs text-muted-foreground">
          Opened {venue.yearOpened}
        </div>
      </div>
    </motion.div>
  );
}
