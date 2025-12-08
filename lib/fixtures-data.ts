import { Match } from "@/types";
import { INITIAL_GROUPS } from "./data";
import fixturesData from "@/fixtures.json";

// Venues for group stage matches (mock data)
const GROUP_STAGE_VENUES = [
  { venue: "SoFi Stadium", city: "Los Angeles" },
  { venue: "MetLife Stadium", city: "New York/New Jersey" },
  { venue: "AT&T Stadium", city: "Dallas" },
  { venue: "Arrowhead Stadium", city: "Kansas City" },
  { venue: "NRG Stadium", city: "Houston" },
  { venue: "Mercedes-Benz Stadium", city: "Atlanta" },
  { venue: "Levi's Stadium", city: "San Francisco Bay Area" },
  { venue: "Lincoln Financial Field", city: "Philadelphia" },
  { venue: "Hard Rock Stadium", city: "Miami" },
  { venue: "Gillette Stadium", city: "Boston" },
  { venue: "Lumen Field", city: "Seattle" },
  { venue: "BMO Field", city: "Toronto" },
  { venue: "BC Place", city: "Vancouver" },
  { venue: "Estadio Azteca", city: "Mexico City" },
  { venue: "Estadio BBVA", city: "Monterrey" },
  { venue: "Estadio Akron", city: "Guadalajara" },
];

/**
 * Generate Group Stage matches (Round Robin)
 * Each group has 4 teams, playing 6 matches total (each team plays 3)
 */
export function generateGroupStageMatches(): Match[] {
  const matches: Match[] = [];
  let matchNumber = 1;

  // Start date: June 11, 2026
  const startDate = new Date("2026-06-11T00:00:00Z");
  let currentDate = new Date(startDate);

  INITIAL_GROUPS.forEach((group, groupIdx) => {
    const teams = group.teams;

    // Round Robin: Generate all unique pairs
    // Matchups: (0,1), (2,3), (0,2), (1,3), (0,3), (1,2)
    const matchups = [
      [0, 1],
      [2, 3],
      [0, 2],
      [1, 3],
      [0, 3],
      [1, 2],
    ];

    matchups.forEach((matchup, matchIdx) => {
      const [homeIdx, awayIdx] = matchup;
      const venue = GROUP_STAGE_VENUES[matchNumber % GROUP_STAGE_VENUES.length];

      // Spread matches across dates (2-3 matches per day)
      if (matchNumber > 1 && matchNumber % 3 === 0) {
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      }

      // Time slots: 12:00, 15:00, 18:00, 21:00 UTC
      const timeSlots = ["12:00", "15:00", "18:00", "21:00"];
      const time = timeSlots[matchNumber % timeSlots.length];

      matches.push({
        id: `group-${group.id}-${matchIdx + 1}`,
        round: "Group",
        homeTeam: teams[homeIdx],
        awayTeam: teams[awayIdx],
        matchNumber,
        venue: venue.venue,
        city: venue.city,
        date: currentDate.toISOString().split("T")[0],
        time,
      });

      matchNumber++;
    });
  });

  return matches;
}

/**
 * Load knockout fixtures from fixtures.json
 */
export function loadKnockoutFixtures(): Match[] {
  const matches: Match[] = [];
  const knockout = fixturesData.knockout_stage;

  // Round of 32
  knockout.round_of_32.forEach((fixture) => {
    matches.push({
      id: `knockout-${fixture.match}`,
      round: "R32",
      matchNumber: fixture.match,
      date: formatDate(fixture.date),
      venue: fixture.venue,
      city: fixture.city,
      // Teams will be TBD based on group results
    });
  });

  // Round of 16
  knockout.round_of_16.forEach((fixture) => {
    matches.push({
      id: `knockout-${fixture.match}`,
      round: "R16",
      matchNumber: fixture.match,
      date: formatDate(fixture.date),
      venue: fixture.venue,
      city: fixture.city,
    });
  });

  // Quarter Finals
  knockout.quarter_finals.forEach((fixture) => {
    matches.push({
      id: `knockout-${fixture.match}`,
      round: "QF",
      matchNumber: fixture.match,
      date: formatDate(fixture.date),
      venue: fixture.venue,
      city: fixture.city,
    });
  });

  // Semi Finals
  knockout.semi_finals.forEach((fixture) => {
    matches.push({
      id: `knockout-${fixture.match}`,
      round: "SF",
      matchNumber: fixture.match,
      date: formatDate(fixture.date),
      venue: fixture.venue,
      city: fixture.city,
    });
  });

  // Bronze Final
  const bronzeFinal = knockout.bronze_final;
  matches.push({
    id: `knockout-${bronzeFinal.match}`,
    round: "SF", // Bronze is technically a semi-final aftermath
    matchNumber: bronzeFinal.match,
    date: formatDate(bronzeFinal.date),
    venue: bronzeFinal.venue,
    city: bronzeFinal.city,
  });

  // Final
  const final = knockout.final;
  matches.push({
    id: `knockout-${final.match}`,
    round: "Final",
    matchNumber: final.match,
    date: formatDate(final.date),
    venue: final.venue,
    city: final.city,
  });

  return matches;
}

/**
 * Format date from "DD-MMM-YY" to "YYYY-MM-DD"
 */
function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-");
  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  return `20${year}-${monthMap[month]}-${day.padStart(2, "0")}`;
}

/**
 * Get all fixtures (Group + Knockout)
 */
export function getAllFixtures(): Match[] {
  const groupMatches = generateGroupStageMatches();
  const knockoutMatches = loadKnockoutFixtures();
  return [...groupMatches, ...knockoutMatches];
}

/**
 * Convert UTC time to local time
 */
export function convertToLocalTime(date: string, time?: string): string {
  if (!time) return "";

  const dateTimeStr = `${date}T${time}:00Z`;
  const dateTime = new Date(dateTimeStr);

  return dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Get unique venues from all fixtures
 */
export function getUniqueVenues(fixtures: Match[]): string[] {
  const venues = new Set<string>();
  fixtures.forEach((f) => f.venue && venues.add(f.venue));
  return Array.from(venues).sort();
}

/**
 * Get unique cities from all fixtures
 */
export function getUniqueCities(fixtures: Match[]): string[] {
  const cities = new Set<string>();
  fixtures.forEach((f) => f.city && cities.add(f.city));
  return Array.from(cities).sort();
}

/**
 * Get unique dates from all fixtures
 */
export function getUniqueDates(fixtures: Match[]): string[] {
  const dates = new Set<string>();
  fixtures.forEach((f) => f.date && dates.add(f.date));
  return Array.from(dates).sort();
}

/**
 * Get all teams involved in group stage
 */
export function getAllTeams() {
  return INITIAL_GROUPS.flatMap((group) => group.teams);
}
