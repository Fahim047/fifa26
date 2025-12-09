export type Venue = {
  id: string;
  name: string;
  city: string;
  country: "USA" | "Canada" | "Mexico";
  state?: string;
  capacity: number;
  matchesHosted: number;
  imageUrl: string;
  description: string;
  features: string[];
  yearOpened: number;
};

export const VENUES: Venue[] = [
  // United States
  {
    id: "sofi-stadium",
    name: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    state: "California",
    capacity: 70240,
    matchesHosted: 8,
    imageUrl: "/venues/sofi-stadium.png",
    description:
      "State-of-the-art indoor-outdoor stadium with a translucent canopy roof",
    features: [
      "Retractable roof canopy",
      "360° video board",
      "LEED certification",
    ],
    yearOpened: 2020,
  },
  {
    id: "metlife-stadium",
    name: "MetLife Stadium",
    city: "New York/New Jersey",
    country: "USA",
    state: "New Jersey",
    capacity: 82500,
    matchesHosted: 8,
    imageUrl: "/venues/metlife-stadium.png",
    description: "Iconic stadium hosting the 2026 World Cup Final",
    features: ["Final venue", "Largest capacity", "Modern amenities"],
    yearOpened: 2010,
  },
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    city: "Dallas",
    country: "USA",
    state: "Texas",
    capacity: 80000,
    matchesHosted: 9,
    imageUrl: "/venues/att-stadium.png",
    description:
      "Massive retractable roof stadium with world's largest HD video screen",
    features: ["Retractable roof", "Giant HD screen", "Premium facilities"],
    yearOpened: 2009,
  },
  {
    id: "arrowhead-stadium",
    name: "Arrowhead Stadium",
    city: "Kansas City",
    country: "USA",
    state: "Missouri",
    capacity: 76416,
    matchesHosted: 6,
    imageUrl: "/venues/arrowhead-stadium.png",
    description: "One of the loudest outdoor stadiums in the world",
    features: ["Historic venue", "Electric atmosphere", "Midwest hospitality"],
    yearOpened: 1972,
  },
  {
    id: "nrg-stadium",
    name: "NRG Stadium",
    city: "Houston",
    country: "USA",
    state: "Texas",
    capacity: 72220,
    matchesHosted: 7,
    imageUrl: "/venues/nrg-stadium.png",
    description: "First NFL stadium with a retractable roof",
    features: ["Retractable roof", "Climate controlled", "Central location"],
    yearOpened: 2002,
  },
  {
    id: "mercedes-benz-stadium",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta",
    country: "USA",
    state: "Georgia",
    capacity: 71000,
    matchesHosted: 8,
    imageUrl: "/venues/mercedes-benz-stadium.png",
    description: "Futuristic stadium with unique retractable roof design",
    features: [
      "Circular retractable roof",
      "LEED Platinum",
      "Halo video board",
    ],
    yearOpened: 2017,
  },
  {
    id: "levis-stadium",
    name: "Levi's Stadium",
    city: "San Francisco Bay Area",
    country: "USA",
    state: "California",
    capacity: 68500,
    matchesHosted: 6,
    imageUrl: "/venues/levis-stadium.png",
    description: "Tech-forward stadium in the heart of Silicon Valley",
    features: ["Green technology", "Suite tower", "Mobile app integration"],
    yearOpened: 2014,
  },
  {
    id: "lincoln-financial-field",
    name: "Lincoln Financial Field",
    city: "Philadelphia",
    country: "USA",
    state: "Pennsylvania",
    capacity: 69796,
    matchesHosted: 6,
    imageUrl: "/venues/lincoln-financial-field.png",
    description: "Modern open-air stadium with passionate fanbase",
    features: ["Solar panels", "HD video boards", "Historic city"],
    yearOpened: 2003,
  },
  {
    id: "hard-rock-stadium",
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "USA",
    state: "Florida",
    capacity: 64767,
    matchesHosted: 7,
    imageUrl: "/venues/hard-rock-stadium.png",
    description: "Tropical paradise venue with modern canopy design",
    features: ["Partial roof canopy", "Tropical climate", "Entertainment hub"],
    yearOpened: 1987,
  },
  {
    id: "gillette-stadium",
    name: "Gillette Stadium",
    city: "Boston",
    country: "USA",
    state: "Massachusetts",
    capacity: 65878,
    matchesHosted: 6,
    imageUrl: "/venues/gillette-stadium.png",
    description: "Home of New England's passionate sports culture",
    features: ["Lighthouse tower", "Historic region", "Premium seating"],
    yearOpened: 2002,
  },
  {
    id: "lumen-field",
    name: "Lumen Field",
    city: "Seattle",
    country: "USA",
    state: "Washington",
    capacity: 68740,
    matchesHosted: 6,
    imageUrl: "/venues/lumen-field.png",
    description: "Known for its incredible atmosphere and 12th Man",
    features: ["Partial roof", "Loud crowd", "Pacific Northwest beauty"],
    yearOpened: 2002,
  },

  // Canada
  {
    id: "bmo-field",
    name: "BMO Field",
    city: "Toronto",
    country: "Canada",
    state: "Ontario",
    capacity: 45500,
    matchesHosted: 6,
    imageUrl: "/venues/bmo-field.png",
    description: "Canada's premier soccer-specific stadium",
    features: ["Soccer-specific", "Expandable", "Urban location"],
    yearOpened: 2007,
  },
  {
    id: "bc-place",
    name: "BC Place",
    city: "Vancouver",
    country: "Canada",
    state: "British Columbia",
    capacity: 54500,
    matchesHosted: 7,
    imageUrl: "/venues/bc-place.png",
    description: "Iconic retractable roof stadium with mountain backdrop",
    features: ["Retractable roof", "Mountain views", "West Coast vibe"],
    yearOpened: 1983,
  },

  // Mexico
  {
    id: "estadio-azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    capacity: 87523,
    matchesHosted: 8,
    imageUrl: "/venues/estadio-azteca.png",
    description: "Legendary stadium hosting its third World Cup",
    features: ["Historic venue", "High altitude", "Third World Cup"],
    yearOpened: 1966,
  },
  {
    id: "estadio-bbva",
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "Mexico",
    capacity: 51000,
    matchesHosted: 7,
    imageUrl: "/venues/estadio-bbva.png",
    description: "Modern architectural marvel in northern Mexico",
    features: ["Modern design", "Premium facilities", "Mountain backdrop"],
    yearOpened: 2015,
  },
  {
    id: "estadio-akron",
    name: "Estadio Akron",
    city: "Guadalajara",
    country: "Mexico",
    capacity: 46232,
    matchesHosted: 6,
    imageUrl: "/venues/estadio-akron.png",
    description: "State-of-the-art stadium in Mexico's cultural capital",
    features: ["Volcanic rock exterior", "Modern amenities", "Cultural hub"],
    yearOpened: 2010,
  },
];

// Helper functions
export function getVenuesByCountry(
  country: "USA" | "Canada" | "Mexico" | "All"
): Venue[] {
  if (country === "All") return VENUES;
  return VENUES.filter((v) => v.country === country);
}

export function getTotalCapacity(): number {
  return VENUES.reduce((sum, v) => sum + v.capacity, 0);
}

export function getTotalMatches(): number {
  return VENUES.reduce((sum, v) => sum + v.matchesHosted, 0);
}

export function searchVenues(query: string): Venue[] {
  const lowercaseQuery = query.toLowerCase();
  return VENUES.filter(
    (v) =>
      v.name.toLowerCase().includes(lowercaseQuery) ||
      v.city.toLowerCase().includes(lowercaseQuery) ||
      v.country.toLowerCase().includes(lowercaseQuery)
  );
}
