import React from "react";
import { Box, Text } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { BodyType } from "types/section";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";

import * as classes from "./ContentfulMetricCard.module.css";

export type ContentfulMetricFields = {
  id: string;
  metricValue?: string;
  metricDescriptionRichText?: BodyType;
};

type Props = {
  metric: ContentfulMetricFields;
  index: number;
  sectionHeader?: string;
};

type ParsedMetric = {
  value: number;
  decimals: number;
  suffix: string;
};

function parseMetric(raw: string): ParsedMetric {
  const match = raw.match(/^(\d+)(?:\.(\d+))?(.*)$/);
  if (!match) return { value: 0, decimals: 0, suffix: raw };
  const decimals = match[2]?.length ?? 0;
  const value = parseFloat(match[1] + (match[2] ? "." + match[2] : ""));
  return { value, decimals, suffix: match[3] ?? "" };
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const lineOpts = {
  renderNode: {
    [BLOCKS.PARAGRAPH](_node: unknown, children: React.ReactNode) {
      return <Text className={classes.line}>{children}</Text>;
    },
  },
};

const ANIMATION_DURATION = 1400;
const STAGGER_DELAY = 150;

/** One metric column; siblings are laid out in a flex row by ReferencedSectionBody / CommonReferencedSectionBody. */
const ContentfulMetricCard: React.FC<Props> = ({ metric, index, sectionHeader }) => {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [displayNum, setDisplayNum] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);
  const triggered = React.useRef(false);
  const rafId = React.useRef<number | null>(null);

  const parsed = React.useMemo(
    () => parseMetric(metric.metricValue ?? ""),
    [metric.metricValue],
  );

  React.useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setVisible(true);

          const delay = index * STAGGER_DELAY;
          let timerId: ReturnType<typeof setTimeout>;

          timerId = setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / ANIMATION_DURATION, 1);
              const eased = easeOut(t);
              const current = eased * parsed.value;
              // Store only the numeric portion; suffix renders separately
              setDisplayNum(current.toFixed(parsed.decimals));
              if (t < 1) {
                rafId.current = requestAnimationFrame(tick);
              }
            };
            rafId.current = requestAnimationFrame(tick);
          }, delay);

          observer.disconnect();

          return () => {
            clearTimeout(timerId);
            if (rafId.current !== null) cancelAnimationFrame(rafId.current);
          };
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [index, parsed]);

  return (
    <Box
      ref={rowRef}
      className={cx(classes.card, {
        [classes.visible]: visible,
        [classes.withDivider]: index === 1,
        [classes.stackSeparator]: index > 0,
        [classes.cardContentCentered]: index === 0 || index === 1,
        [classes.cardElevated]: index === 2,
      })}
    >
      {index === 0 && sectionHeader && (
        <p className={classes.eyebrow}>{sectionHeader}</p>
      )}

      {metric.metricValue && (
        <span className={classes.numWrapper}>
          <span className={classes.numValue}>{displayNum ?? "0"}</span>
          {parsed.suffix && (
            <span className={classes.numSuffix}>{parsed.suffix}</span>
          )}
        </span>
      )}

      {metric.metricDescriptionRichText && (
        <Box className={classes.lbl}>
          {renderRichText(metric.metricDescriptionRichText, lineOpts)}
        </Box>
      )}
    </Box>
  );
};

export default ContentfulMetricCard;
