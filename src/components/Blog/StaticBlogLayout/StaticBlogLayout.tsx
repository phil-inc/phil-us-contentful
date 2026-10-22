import React from "react";
import {
  Anchor,
  AspectRatio,
  Box,
  Container,
  List,
  Text,
  Title,
} from "@mantine/core";
import cx from "clsx";
import { Layout } from "layouts/Layout/Layout";
import SocialShare from "components/Blog/SocialShare/SocialShare";
import { StaticBlogCtaBanner } from "components/Blog/StaticBlogCtaBanner/StaticBlogCtaBanner";
import {
  StaticBlogAuthor,
  type StaticBlogAuthorProps,
} from "components/Blog/StaticBlogAuthor/StaticBlogAuthor";

import * as classes from "./staticBlogLayout.module.css";

// Author bios are built from these two; posts import every primitive from this one module.
export { AuthorBioP, AuthorBioA } from "components/Blog/StaticBlogAuthor/StaticBlogAuthor";

/**
 * Shell for a blog or webinar post that has been moved off Contentful. Posts live in
 * src/pages/_posts/<slug>/index.tsx and pass only their metadata and body; the page
 * chrome (title, hero, share bar, bottom banner) is defined once, here.
 *
 * Nothing in this file touches Contentful. See SPEC.md for what it reproduces and
 * where it deliberately differs from src/templates/blog.tsx.
 */

type WithChildren = { children?: React.ReactNode };

type Hero = {
  src: string;
  /** Empty for a decorative hero. The live template used the asset's file title. */
  alt: string;
  width?: number;
  height?: number;
};

type StaticBlogLayoutProps = {
  title: string;
  hero?: Hero;
  author?: StaticBlogAuthorProps;
  children: React.ReactNode;
};

export const StaticBlogLayout: React.FC<StaticBlogLayoutProps> = ({
  title,
  hero,
  author,
  children,
}) => (
  <Layout>
    <Container component="article" size="xl" className={classes.wrapper}>
      <Title order={1} className={classes.title}>
        {title}
      </Title>

      {hero && (
        <Container className={classes.floatingImage} size="sm">
          <img
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            loading="lazy"
          />
        </Container>
      )}

      <Box mb={42}>{children}</Box>

      <SocialShare />

      {author && <StaticBlogAuthor {...author} />}
    </Container>

    <StaticBlogCtaBanner />
  </Layout>
);

// ─── Body primitives ──────────────────────────────────────────────────────────
// One per rich-text node the live template renders. The converter in
// skills/migrate-subpage-to-static emits only these.

export const BlogP: React.FC<WithChildren> = ({ children }) => (
  <Text className={classes.paragraph}>{children}</Text>
);

export const BlogH2: React.FC<WithChildren> = ({ children }) => (
  <Title order={2} className={cx(classes.heading, classes.heading2)}>
    {children}
  </Title>
);

export const BlogH3: React.FC<WithChildren> = ({ children }) => (
  <Title order={3} className={cx(classes.heading, classes.heading3)}>
    {children}
  </Title>
);

export const BlogH4: React.FC<WithChildren> = ({ children }) => (
  <Title order={4} className={cx(classes.heading, classes.heading4)}>
    {children}
  </Title>
);

export const BlogH6: React.FC<WithChildren> = ({ children }) => (
  <Title order={6} className={cx(classes.heading, classes.heading6)}>
    {children}
  </Title>
);

/** The live template opens every link in a new tab with no referrer, internal ones included. */
export const BlogA: React.FC<WithChildren & { href: string }> = ({
  href,
  children,
}) => (
  <Anchor
    href={href}
    target="_blank"
    referrerPolicy="no-referrer"
    className={classes.anchor}
  >
    {children}
  </Anchor>
);

export const BlogUL: React.FC<WithChildren> = ({ children }) => (
  <List
    className={classes.unorderedList}
    type="unordered"
    listStyleType="disc"
  >
    {children}
  </List>
);

export const BlogOL: React.FC<WithChildren> = ({ children }) => (
  <List className={classes.orderedList} type="ordered">
    {children}
  </List>
);

export const BlogLI: React.FC<WithChildren> = ({ children }) => (
  <List.Item mb={0} pr={20} className={classes.listItem}>
    {children}
  </List.Item>
);

export const BlogHR: React.FC = () => <hr />;

/** A plain image: the live page used a responsive GatsbyImage for the same file. */
export const BlogImage: React.FC<{
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}> = ({ src, alt, width, height }) => (
  <Box className={classes.embededAsset}>
    <Box className={classes.embededAssetWrapper}>
      <img
        className={classes.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
      />
    </Box>
  </Box>
);

/**
 * Server-rendered on purpose. The live YouTubeVideo is client-only and ships a
 * "Loading..." placeholder in the HTML, which crawlers and llms-full.txt read.
 */
export const BlogYouTube: React.FC<{ videoId: string; title: string }> = ({
  videoId,
  title,
}) => (
  <div className={classes.video}>
    <AspectRatio ratio={16 / 9}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </AspectRatio>
  </div>
);
