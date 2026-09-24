import { SiteFooter } from "@/components/molecules/site-footer";
import { SiteNav } from "@/components/organisms/site-nav";
import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** Nav, centred content column, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <Flex as="main" direction="column" align="center" minHeight="100vh">
      {/* Skip link — first focusable element; hidden off-screen, revealed on :focus */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Flex direction="column" align="center" gap="20" flex="1" width="full">
        <SiteNav />

        <Flex
          id="main-content"
          direction="column"
          gap="20"
          flex="1"
          width="full"
          minWidth="0"
          maxWidth="5xl"
          padding="5"
        >
          {children}
        </Flex>

        <SiteFooter />
      </Flex>
    </Flex>
  );
}
