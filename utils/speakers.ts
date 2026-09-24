import type { Session } from "@/types/session";

export interface SpeakerGroup {
  speaker: string;
  sessions: Session[];
}

/**
 * Speaker entries that represent a group or panel rather than an individual,
 * and should be excluded from the speakers listing.
 */
const EXCLUDED_SPEAKERS = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker, excludes non-individual entries (e.g. the
 * closing panel's "Full speaker lineup"), and returns the groups sorted
 * alphabetically by speaker name.
 *
 * Sessions within each group retain the original order (chronological, since
 * fetchSessions() orders by start_time).
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerGroup[] {
  const groups = new Map<string, Session[]>();

  for (const session of sessions) {
    if (EXCLUDED_SPEAKERS.has(session.speaker)) continue;

    const existing = groups.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      groups.set(session.speaker, [session]);
    }
  }

  return Array.from(groups, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: speakerSessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
