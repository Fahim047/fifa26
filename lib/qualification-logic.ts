import { GroupStandings, Team } from "@/types";

export function getThirdPlaceTeams(
  standings: GroupStandings
): { team: Team; groupId: string }[] {
  const thirds: { team: Team; groupId: string }[] = [];
  Object.entries(standings).forEach(([groupId, teams]) => {
    if (teams.length >= 3) {
      thirds.push({ team: teams[2], groupId });
    }
  });
  return thirds;
}

// Helper to check if a team is in the advanced list (1st, 2nd, or best 3rd)
export function isQualified(
  teamId: string,
  standings: GroupStandings,
  bestThirds: string[]
) {
  // Logic to check...
  return false;
}
