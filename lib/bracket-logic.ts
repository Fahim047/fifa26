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

// Helper to get team from ID in the full list of teams (needs access to all teams, we can get from standings)
// Or just pass the Team object around.

export function generateFullBracket(
  standings: GroupStandings,
  bestThirds: string[],
  matchDecisions: Record<string, string>
): { [round: string]: Match[] } {
  // We need to generate ALL matches for R32, R16, QF, SF, Final, Bronze
  // irrespective of whether they have teams yet.

  // 1. Solve R32 (Source of Truth) using Same Logic as before (Backtracking for 3rd)
  const r32Fixtures = fixtures.knockout_stage.round_of_32;

  // A. Parse Constraints
  const thirdPlaceMatches: {
    matchIndex: number;
    slot: "home" | "away";
    allowedGroups: string[];
  }[] = [];
  r32Fixtures.forEach((fix: any, idx: number) => {
    if (fix.team1.startsWith("3"))
      thirdPlaceMatches.push({
        matchIndex: idx,
        slot: "home",
        allowedGroups: parseAllowedGroups(fix.team1),
      });
    if (fix.team2.startsWith("3"))
      thirdPlaceMatches.push({
        matchIndex: idx,
        slot: "away",
        allowedGroups: parseAllowedGroups(fix.team2),
      });
  });

  // B. Candidates
  const thirdPlaceCandidates: { id: string; group: string; team: Team }[] = [];
  for (const teamId of bestThirds) {
    for (const [gid, teams] of Object.entries(standings)) {
      const team = teams.find((t) => t.id === teamId);
      if (team) {
        thirdPlaceCandidates.push({ id: teamId, group: gid, team });
        break;
      }
    }
  }

  // C. Solve
  const assignments = new Map<number, Team>();
  const used = new Set<string>();

  const solve = (index: number): boolean => {
    if (index === thirdPlaceMatches.length) return true;
    const req = thirdPlaceMatches[index];

    // Optimization: Try to pick cand that matches req
    for (const cand of thirdPlaceCandidates) {
      if (!used.has(cand.id)) {
        if (req.allowedGroups.includes(cand.group)) {
          assignments.set(index, cand.team);
          used.add(cand.id);
          if (solve(index + 1)) return true;
          used.delete(cand.id);
          assignments.delete(index);
        }
      }
    }
    return false;
  };

  solve(0); // Run solver

  // D. Build R32 Matches (Unsorted initially)
  // We need a lookup for all matches by ID to link them later
  const allMatchesLookup = new Map<string, Match>();
  // And store raw objects first

  // Create R32 Matches
  r32Fixtures.forEach((fix: any, idx: number) => {
    let homeTeam: Team | undefined;
    let awayTeam: Team | undefined;

    if (fix.team1.startsWith("3")) {
      const assignmentIdx = thirdPlaceMatches.findIndex(
        (t) => t.matchIndex === idx && t.slot === "home"
      );
      if (assignmentIdx !== -1) homeTeam = assignments.get(assignmentIdx);
    } else {
      homeTeam = getTeamByCode(fix.team1, standings);
    }

    if (fix.team2.startsWith("3")) {
      const assignmentIdx = thirdPlaceMatches.findIndex(
        (t) => t.matchIndex === idx && t.slot === "away"
      );
      if (assignmentIdx !== -1) awayTeam = assignments.get(assignmentIdx);
    } else {
      awayTeam = getTeamByCode(fix.team2, standings);
    }

    const m: Match = {
      id: String(fix.match),
      round: "R32",
      homeTeam,
      awayTeam,
      winner: undefined,
      matchNumber: fix.match,
      venue: fix.venue,
      city: fix.city,
      date: fix.date,
    };

    applyDecision(m, matchDecisions);
    allMatchesLookup.set(m.id, m);
  });

  // 2. Build Subsequent Rounds (R16, QF, SF, Final, Bronze)
  // We construct them but don't sort yet.

  const buildRound = (roundKey: string, roundFixtures: any[]) => {
    roundFixtures.forEach((fix: any) => {
      const m: Match = {
        id: String(fix.match),
        round: roundKey as any,
        homeTeam: undefined, // Filled later via sorting/linking
        awayTeam: undefined,
        winner: undefined,
        matchNumber: fix.match,
        venue: fix.venue,
        city: fix.city,
        date: fix.date,
      };
      // Store raw fixture info for linking
      (m as any)._source1 = fix.team1;
      (m as any)._source2 = fix.team2;

      allMatchesLookup.set(m.id, m);
    });
  };

  buildRound("R16", fixtures.knockout_stage.round_of_16);
  buildRound("QF", fixtures.knockout_stage.quarter_finals);
  buildRound("SF", fixtures.knockout_stage.semi_finals);
  // Bronze excluded from main tree flow usually, but we can add
  if (fixtures.knockout_stage.bronze_final)
    buildRound("Bronze", [fixtures.knockout_stage.bronze_final]);
  buildRound("Final", [fixtures.knockout_stage.final]);

  // 3. Link and Sort Recursively
  // We start from Final and walk back.
  const sortedRounds: { [key: string]: Match[] } = {
    R32: [],
    R16: [],
    QF: [],
    SF: [],
    Final: [],
    Bronze: [],
  };

  const processed = new Set<string>();

  const linkAndCollect = (matchId: string) => {
    if (processed.has(matchId)) return;

    const m = allMatchesLookup.get(matchId);
    if (!m) return; // Should not happen

    // Check sources
    const s1 = (m as any)._source1; // "W73"
    const s2 = (m as any)._source2;

    // Helper to resolve source match ID
    const getSource = (code: string): Match | undefined => {
      if (!code) return undefined;
      // Can be "W73", "L101", OR "1A" (for R32, which has no source match)
      const mId = code.substring(1);
      const type = code.charAt(0);
      if (type === "W" || type === "L") {
        // Look up by ID directly (e.g. "73")
        return allMatchesLookup.get(mId);
      }
      return undefined;
    };

    const m1 = getSource(s1);
    const m2 = getSource(s2);

    // Recurse first (Left Branch, Right Branch)
    // This ensures the dependency sources appear in the previous round list in the correct order
    // relative to this match.
    // BUT wait, we need to collect into specific round arrays.
    // We want the Order in R32 array to be: [Match Feeding 89 Home, Match Feeding 89 Away, Match Feeding 90 Home...]

    if (m1) linkAndCollect(m1.id);
    if (m2) linkAndCollect(m2.id);

    // Update current match teams based on sources
    if (m.round !== "R32") {
      // Resolve Home
      if (s1.startsWith("W") && m1) {
        m.homeTeam = m1.winner;
      }
      if (s1.startsWith("L") && m1) {
        // Loser logic
        if (m1.winner) {
          m.homeTeam =
            m1.homeTeam?.id === m1.winner.id ? m1.awayTeam : m1.homeTeam;
        }
      }

      // Resolve Away
      if (s2.startsWith("W") && m2) {
        m.awayTeam = m2.winner;
      }
      if (s2.startsWith("L") && m2) {
        if (m2.winner) {
          m.awayTeam =
            m2.homeTeam?.id === m2.winner.id ? m2.awayTeam : m2.homeTeam;
        }
      }

      applyDecision(m, matchDecisions);
    }

    // Add to sorted list
    if (!processed.has(m.id)) {
      if (sortedRounds[m.round]) {
        sortedRounds[m.round].push(m);
      }
      processed.add(m.id);
    }
  };

  // Start traversal from Final
  const finalMatchId = String(fixtures.knockout_stage.final.match);
  linkAndCollect(finalMatchId);

  // Also handle Bronze if needed (disconnected from main tree traversal if we only follow winners)
  // Bronze comes from Losers of SF. SF matches are already processed by Final traversal.
  // So we just need to ensure Bronze match itself is added.
  if (fixtures.knockout_stage.bronze_final) {
    // We don't recurse inputs because they are SFs already covered.
    // Just link logic.
    const bz = allMatchesLookup.get(
      String(fixtures.knockout_stage.bronze_final.match)
    );
    if (bz) {
      const s1 = (bz as any)._source1;
      const s2 = (bz as any)._source2;
      // Link logic same as above needs to be run or reused.
      // For brevity, let's just re-resolve:
      const m1 = allMatchesLookup.get(s1.substring(1));
      const m2 = allMatchesLookup.get(s2.substring(1));

      if (m1 && m1.winner)
        bz.homeTeam =
          m1.homeTeam?.id === m1.winner.id ? m1.awayTeam : m1.homeTeam;
      if (m2 && m2.winner)
        bz.awayTeam =
          m2.homeTeam?.id === m2.winner.id ? m2.awayTeam : m2.homeTeam;
      applyDecision(bz, matchDecisions);
      sortedRounds["Bronze"].push(bz);
    }
  }

  return sortedRounds;
}

function applyDecision(m: Match, decisions: Record<string, string>) {
  const decisionId = decisions[m.id];
  if (decisionId) {
    if (m.homeTeam && m.homeTeam.id === decisionId) m.winner = m.homeTeam;
    else if (m.awayTeam && m.awayTeam.id === decisionId) m.winner = m.awayTeam;
  }
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
