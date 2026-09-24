import { Badge } from "@/components/atoms/badge";
import { Link } from "@/i18n/navigation";
import { fetchSessionById, fetchSessions } from "@/services/sessions";
import { Flex, Heading, Text, VisuallyHidden } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const sessions = await fetchSessions();

  // Cache Components rejects an empty array here — a fresh environment with
  // no rows yet (or no table at all) would otherwise fail the build. The
  // placeholder id never matches a real session, so the page below falls
  // through to notFound() for it, same as any other unknown id.
  if (sessions.length === 0) return [{ id: "__placeholder__" }];

  return sessions.map((session) => ({ id: session.id }));
}

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [session, t] = await Promise.all([
    fetchSessionById(id),
    getTranslations("Sessions"),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <Flex direction="column" gap="6" flex="1" width="full">
      <Link href="/sessions">
        <Text
          fontSize="sm"
          width="fit-content"
          color="var(--text-muted)"
          _hover={{ textDecoration: "underline" }}
        >
          ← Back to schedule
        </Text>
      </Link>

      <Flex direction="column" gap="3">
        <Flex align="center" gap="3">
          <Badge>
            <VisuallyHidden>{t("trackLabel")}: </VisuallyHidden>
            <span>{session.track}</span>
          </Badge>
          <Badge variant="outline">
            <VisuallyHidden>{t("levelLabel")}: </VisuallyHidden>
            <span>{t(`level.${session.level}`)}</span>
          </Badge>
          <Text fontSize="sm" color="var(--text-muted)">
            {session.startTime} · {session.durationMinutes} min · {session.room}
          </Text>
        </Flex>
        <Heading as="h1" fontSize="3xl" fontWeight="bold">
          {session.title}
        </Heading>
        <Text color="var(--text-muted)">{session.speaker}</Text>
      </Flex>

      <Text fontSize="md" lineHeight="relaxed" maxWidth="2xl">
        {session.description}
      </Text>
    </Flex>
  );
}
