import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Grid } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakerGroups = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Every speaker and their sessions at React Alicante.
      </PageHeading>

      <Grid
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
