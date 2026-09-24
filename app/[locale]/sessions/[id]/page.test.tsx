import { notFound } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import { fetchSessionById } from "@/services/sessions";
import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SessionDetailPage from "./page";

vi.mock("@/services/sessions", () => ({
  fetchSessionById: vi.fn(),
}));

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return {
    ...actual,
    notFound: vi.fn(() => {
      throw new Error("NEXT_NOT_FOUND");
    }),
  };
});

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 30,
  description: "Where frontend is headed.",
};

describe("SessionDetailPage", () => {
  it("shows the track and level badges alongside the session details", async () => {
    vi.mocked(fetchSessionById).mockResolvedValue(session);

    const ui = await SessionDetailPage({
      params: Promise.resolve({ id: "opening-keynote" }),
    });
    render(ui);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("beginner")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
  });

  it("calls notFound for an unknown session id", async () => {
    vi.mocked(fetchSessionById).mockResolvedValue(null);

    await expect(
      SessionDetailPage({ params: Promise.resolve({ id: "unknown" }) }),
    ).rejects.toThrow();

    expect(notFound).toHaveBeenCalled();
  });
});
