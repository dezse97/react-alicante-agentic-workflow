import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A Speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("returns an empty array when there are no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });

  it("groups multiple sessions by the same speaker into one entry", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Alice", startTime: "09:00" }),
      session({ id: "s2", speaker: "Alice", startTime: "14:00" }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].speaker).toBe("Alice");
    expect(groups[0].sessions).toHaveLength(2);
  });

  it("sorts speakers alphabetically by name", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Zara" }),
      session({ id: "s2", speaker: "Alice" }),
      session({ id: "s3", speaker: "Marta" }),
    ]);

    expect(groups.map((g) => g.speaker)).toEqual(["Alice", "Marta", "Zara"]);
  });

  it("excludes the 'Full speaker lineup' panel entry", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Alice" }),
      session({ id: "s2", speaker: "Full speaker lineup" }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].speaker).toBe("Alice");
  });

  it("preserves the original (chronological) session order within each group", () => {
    const first = session({ id: "s1", speaker: "Alice", startTime: "09:00" });
    const second = session({ id: "s2", speaker: "Alice", startTime: "11:00" });
    const third = session({ id: "s3", speaker: "Alice", startTime: "14:00" });

    const groups = groupSessionsBySpeaker([first, second, third]);

    expect(groups[0].sessions).toEqual([first, second, third]);
  });

  it("handles a session from a single speaker with no duplicates", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Bob" }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].speaker).toBe("Bob");
    expect(groups[0].sessions).toHaveLength(1);
  });
});
