import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex, Grid, Heading } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Speakers | React Alicante Companion",
};

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SpeakersPage" });
  const sessions = await fetchSessions();
  const speakerGroups = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("heading")}>{t("subheading")}</PageHeading>

      {/* Visually-hidden h2 bridges the heading hierarchy: h1 → h2 → h3 (CardTitle) */}
      <Heading as="h2" id="speakers-grid-heading" srOnly>
        {t("heading")}
      </Heading>

      <Grid
        as="section"
        aria-labelledby="speakers-grid-heading"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="4"
      >
        {speakerGroups.map(({ speaker, sessions: speakerSessions }) => (
          <SpeakerCard
            key={speaker}
            speaker={speaker}
            sessions={speakerSessions}
          />
        ))}
      </Grid>
    </Flex>
  );
}
