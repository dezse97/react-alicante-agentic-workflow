import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text, VisuallyHidden } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  const t = useTranslations("Sessions");

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
              <Badge variant="outline">
                <VisuallyHidden>{t("levelLabel")}: </VisuallyHidden>
                <span>{t(`level.${session.level}`)}</span>
              </Badge>
            </Box>
          </Flex>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
