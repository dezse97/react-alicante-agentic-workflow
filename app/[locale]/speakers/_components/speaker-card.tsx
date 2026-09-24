import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: string;
  sessions: Session[];
}

export function SpeakerCard({ speaker, sessions }: SpeakerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* as="ul" gives screen readers an item count for the session list */}
        <Flex
          as="ul"
          direction="column"
          gap="2"
          listStyleType="none"
          padding="0"
          margin="0"
        >
          {sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title} — ${speaker} at ${session.startTime}`}
              >
                <Flex gap="3" align="baseline">
                  <Text
                    as="span"
                    fontSize="sm"
                    color="var(--text-muted)"
                    flexShrink="0"
                  >
                    {session.startTime}
                  </Text>
                  <Text
                    as="span"
                    fontSize="sm"
                    _hover={{ textDecoration: "underline" }}
                    _focusVisible={{ textDecoration: "underline" }}
                  >
                    {session.title}
                  </Text>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
