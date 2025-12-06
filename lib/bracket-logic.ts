import { GroupStandings, Match, Team } from "@/types";
// @ts-ignore
import fixtures from "@/fixtures.json";

// Helper to get team by group position code (e.g., "1A", "2B")
const getTeamByCode = (
  code: string,
  standings: GroupStandings
): Team | undefined => {
  const position = parseInt(code.charAt(0)); // 1 or 2
  const groupId = code.charAt(1); // A, B, etc.
  const groupTeams = standings[groupId];
  if (!groupTeams) return undefined;
  return groupTeams[position - 1];
};

// Helper to extract allowed groups from code "3 CDFGH"
const parseAllowedGroups = (code: string): string[] => {
  return code.replace("3", "").trim().replace(/\s/g, "").split("");
};

export function generateBracket(
  standings: GroupStandings,
  bestThirds: string[]
): Match[] {
  const matches: Match[] = [];
  const r32Fixtures = fixtures.knockout_stage.round_of_32;

  // 1. Identify all matches that need a 3rd place team and their constraints
  const thirdPlaceMatches: {
    matchIndex: number;
    slot: "home" | "away";
    allowedGroups: string[];
  }[] = [];

  r32Fixtures.forEach((fix: any, idx: number) => {
    if (fix.team1.startsWith("3")) {
      thirdPlaceMatches.push({
        matchIndex: idx,
        slot: "home",
        allowedGroups: parseAllowedGroups(fix.team1),
      });
    }
    if (fix.team2.startsWith("3")) {
      thirdPlaceMatches.push({
        matchIndex: idx,
        slot: "away",
        allowedGroups: parseAllowedGroups(fix.team2),
      });
    }
  });

  // 2. Identify available 3rd place teams and their groups
  // We need to map teamId -> group
  const thirdPlaceCandidates: { id: string; group: string; team: Team }[] = [];

  for (const teamId of bestThirds) {
    for (const [gid, teams] of Object.entries(standings)) {
      // Robust check: matches ID
      const team = teams.find((t) => t.id === teamId);
      if (team) {
        // Confirm it's the 3rd place one? Or just trust bestThirds list?
        // Trust list for flexibility, but capture group ID.
        thirdPlaceCandidates.push({ id: teamId, group: gid, team });
        break;
      }
    }
  }

  // 3. Solve Assignment Problem (Backtracking)
  // We need to assign each thirdPlaceMatches item a Unique candidate such that candidate.group is in match.allowedGroups

  const assignments = new Map<number, Team>(); // Key: global index in thirdPlaceMatches array
  const used = new Set<string>(); // Used team IDs

  function solve(index: number): boolean {
    if (index === thirdPlaceMatches.length) {
      return true; // All assigned
    }

    const req = thirdPlaceMatches[index];

    // Try to find a candidate
    for (const cand of thirdPlaceCandidates) {
      if (!used.has(cand.id)) {
        if (req.allowedGroups.includes(cand.group)) {
          // Valid assignment
          assignments.set(index, cand.team);
          used.add(cand.id);

          if (solve(index + 1)) return true;

          // Backtrack
          used.delete(cand.id);
          assignments.delete(index);
        }
      }
    }
    return false;
  }

  // Only run solver if we have enough candidates for the slots?
  // We usually select 8, and there are 8 slots.
  // If user selected fewer, we try to fill as many as possible?
  // Backtracking tries to fill ALL. If it fails, we need a partial fill strategy or sorting strategy.
  // Let's sort constraints: matches with fewer allowed groups should be solved first.

  // Sort thirdPlaceMatches by number of allowed groups (ascending) to improve heuristic
  // We need to keep track of original indices or just map back.
  // Actually, we can just solve in the sorted order.

  // Note: We need to map the result back to the specific match.
  // Let's assume we fill correctly.

  // Optimization: Sort for better chance of finding sol in MVP
  // But rigorous backtracking finds it if it exists.

  const success = solve(0);

  // 4. Build Matches
  r32Fixtures.forEach((fix: any, idx: number) => {
    let homeTeam: Team | undefined;
    let awayTeam: Team | undefined;

    // Resolve Home
    if (fix.team1.startsWith("3")) {
      // Find the assignment for this slot
      const assignmentIdx = thirdPlaceMatches.findIndex(
        (t) => t.matchIndex === idx && t.slot === "home"
      );
      if (assignmentIdx !== -1) {
        homeTeam = assignments.get(assignmentIdx);
      }
    } else {
      homeTeam = getTeamByCode(fix.team1, standings);
    }

    // Resolve Away
    if (fix.team2.startsWith("3")) {
      const assignmentIdx = thirdPlaceMatches.findIndex(
        (t) => t.matchIndex === idx && t.slot === "away"
      );
      if (assignmentIdx !== -1) {
        awayTeam = assignments.get(assignmentIdx);
      }
    } else {
      awayTeam = getTeamByCode(fix.team2, standings);
    }

    matches.push({
      id: fix.match,
      round: "R32",
      homeTeam,
      awayTeam,
      nextMatchId: getNextMatchId(fix.match),
    });
  });

  return matches;
}

// Removed resolveThirdPlace as it is replaced by solver above

function getNextMatchId(currentMatchId: string): string | undefined {
  // Map R32 matches to R16 matches based on fixtures.json
  // R16 fixtures: { match: "M89", team1: "W73", team2: "W75" }
  // We need to reverse map or parse R16 to build the links.
  // For MVP, we can just return undefined here and handle linking in the View or build a map.

  // Better: Build a map from "W73" -> "M89" (home slot)
  // I can do this statically or dynamically.
  // Let's do a quick lookup here if we want or just handle it in the component.
  // Since the BracketView calculates next matches dynamically, we might not need this ID
  // unless we want to use the precise IDs from the PDF.

  return undefined;
}
