export type Team = {
  id: string;
  name: string;
  code: string; // ISO code or custom short code
  flagUrl?: string; // Optional for now
};

export type Group = {
  id: string;
  name: string;
  teams: Team[];
};

export type Match = {
  id: string;
  round: "R32" | "R16" | "QF" | "SF" | "Final";
  homeTeam?: Team;
  awayTeam?: Team;
  winner?: Team;
  nextMatchId?: string; // Pointer to the next match
  nextMatchSlot?: "home" | "away";
  matchNumber?: number;
  venue?: string;
  city?: string;
  date?: string;
};

export type GroupStandings = {
  [groupId: string]: Team[];
};
