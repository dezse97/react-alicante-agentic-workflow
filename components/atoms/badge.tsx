import {
  Badge as ChakraBadge,
  type BadgeProps as ChakraBadgeProps,
} from "@chakra-ui/react";
import type { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "style" | "className" | "color"
> {
  variant?: BadgeVariant;
}

const VARIANT_CSS: Record<BadgeVariant, ChakraBadgeProps["css"]> = {
  default: {
    background: "var(--accent-hex)",
    color: "var(--background-hex)",
    borderColor: "var(--accent-hex)",
  },
  secondary: {
    background: "var(--card-bg)",
    color: "var(--text-secondary)",
    borderColor: "var(--card-border-hex)",
  },
  destructive: {
    background: "transparent",
    color: "var(--error-hex)",
    borderColor: "var(--error-hex)",
  },
  outline: {
    background: "transparent",
    color: "var(--text-primary)",
    // `--card-border-hex` (used for subtle dividers elsewhere) is too low
    // contrast (~1.1-1.3:1) for a badge's boundary, which needs to meet
    // WCAG 1.4.11 Non-Text Contrast (3:1). `--text-secondary` is already
    // audited for text contrast against both theme backgrounds, so it's
    // comfortably above that floor too.
    borderColor: "var(--text-secondary)",
  },
};

export function Badge({ variant = "default", ...props }: BadgeProps) {
  return (
    <ChakraBadge
      variant="outline"
      borderWidth="1px"
      css={VARIANT_CSS[variant]}
      {...props}
    />
  );
}
