import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

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
        <Flex direction="column" gap="2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
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
                >
                  {session.title}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
