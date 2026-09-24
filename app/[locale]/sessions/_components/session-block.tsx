import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Text fontWeight="medium" color="var(--text-primary)" truncate>
            {session.title}
          </Text>
          <Flex align="center" gap="1">
            <Text color="var(--text-muted)" truncate flex="1">
              {session.startTime} · {session.speaker}
            </Text>
            <Box flexShrink="0">
              <Badge variant="outline">{session.level}</Badge>
            </Box>
          </Flex>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
