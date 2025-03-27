import {
  Box,
  Divider,
  List,
  Anchor,
  Group,
  Text,
  SimpleGrid,
  Button,
  Title,
} from "@mantine/core";
import {
  COMPANY_PAGE,
  CONTACT_PAGE,
  PATIENTS_PAGE,
  RESOURCES,
} from "constants/page";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import slugify from "slugify";
import { type TAsset } from "types/asset";
import { type ContentfulPage } from "types/page";
import { getPathForSectionAndPage } from "utils/links";
import { getFinalIndex } from "utils/getFinalIndex";
import { CAREERS, EXECUTIVE_TEAM } from "constants/routes";

import * as classes from "./desktopFooter.module.css";
import Asset from "components/common/Asset/Asset";
import { ContentfulButton } from "../CHeader/CHeader";
import { BodyType } from "types/section";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";
import { EmailIcon } from "components/common/Buttons/SocialButtons/EmailIcon";

type TDesktopFooter = {
  pages: ContentfulPage[];
  footer: {
    badge: TAsset[];
    navigationLinks: ContentfulPage[];
    logo: TAsset;
    buttons: ContentfulButton[];
    address: BodyType;
  };
};

const DesktopFooter: React.FC<TDesktopFooter> = ({ pages, footer }) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_4](node, children) {
        return (
          <Title className={cx(classes.heading, classes.heading4)}>
            {children}
          </Title>
        );
      },

      [BLOCKS.PARAGRAPH](node, children) {
        return <Title className={cx(classes.paragraph)}>{children}</Title>;
      },
    },
  };

  const buttonConfig = {
    primary: { variant: "header-primary", size: "sm", uppercase: true },
    secondary: { variant: "header-secondary", size: "sm", uppercase: true },
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSection}>
      <Box className={classes.logo}>
            <Anchor href="/" target="_blank">
              <Asset asset={footer.logo} objectFit="contain" />
            </Anchor>
        </Box>

        <div>
        {footer.address && renderRichText(footer.address, options)}
        </div>

        <div className={classes.socials}>
          <Group gap={0}>
              <EmailIcon/>
              <Text
                unstyled
                span
                data-manual-entry={true}
                className={classes.link}
              >
                info@phil.us
              </Text>
            </Group>
          <Anchor
            href="https://www.linkedin.com/company/phil-inc-"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.link}
          >
            <Group gap={0}>
              <StaticImage
                src="../../../assets/images/linkedin.svg"
                alt="LinkedIn Icon"
              />
              <Text
                unstyled
                span
                data-manual-entry={true}
                className={classes.link}
              >
                Linkedin
              </Text>
            </Group>
          </Anchor>
        </div>
      </div>

      <SimpleGrid
        classNames={{ root: classes.root }}
        cols={{ base: 4, sm: 2, md: 3, lg: 3 }}
        spacing={74}
        verticalSpacing={20}
      >
        {pages
          .filter((page) => page.title !== "Home")
          .map((page) => {
            const [firstSection = { header: "#" }] = page.sections;

            let path: string;
            if (page.title === "Home") {
              path = "/";
            } else {
              const slug = slugify(page.slug, { lower: true, strict: true });

              if (page.title === RESOURCES) {
                const sectionSlug = slugify(firstSection.header, {
                  lower: true,
                  strict: true,
                });

                path = `/${slug}/${sectionSlug}`;
              } else {
                path = `/${slug}`;
              }
            }

            return (
              <Box key={page.id + "mapFooterPages"} className={classes.column}>
                <Box>
                  {/* <Link to={path} className={classes.link}> */}
                    <Text className={classes.header} unstyled>
                      {page.title}
                    </Text>
                  {/* </Link> */}
                  <Divider className={classes.divider} />

                  {/* sub-lists of footer */}
                  <List listStyleType="none" spacing={8}>
                    {page.title === COMPANY_PAGE && (
                      <List.Item>
                        <Link to={EXECUTIVE_TEAM} className={classes.link}>
                          <Text unstyled>Executive Team</Text>
                        </Link>
                      </List.Item>
                    )}

                    {page.title === CONTACT_PAGE && (
                        // <List.Item>
                        <div>
                          {footer.buttons.map((button, index) => {
                            const buttonComponent = (
                              <Button
                              size={
                                button.buttonStyle === "Primary"
                                  ? buttonConfig.primary.size
                                  : buttonConfig.secondary.size
                              }
                              variant={
                                button.buttonStyle === "Primary"
                                  ? buttonConfig.primary.variant
                                  : buttonConfig.secondary.variant
                              }
                              >
                                {button.buttonText}
                              </Button>
                            );

                            return (
                              // TODO: use sys
                              <List.Item
                                key={button.id}
                                data-noindicator="true"
                                className={classes.headerCTA}
                              >
                                {button.internalLink ? (
                                  <Box>
                                    <Link to={`/${button.internalLink.slug}`}>
                                      {buttonComponent}
                                    </Link>
                                  </Box>
                                ) : (
                                  <Anchor
                                    href={button.externalLink}
                                    target="_blank"
                                  >
                                    {buttonComponent}
                                  </Anchor>
                                )}
                              </List.Item>
                            );
                          })}
                        </div>

                        // </List.Item>
                      )}

                    {page.sections
                      .filter((section) =>
                        Boolean(
                          ((section.header?.length ?? section.title?.length) &&
                            !section.isHidden &&
                            !section?.hideNavigationAnchor) && section.header !== "Contact us"
                        ),
                      )
                      .map((section, index) => {
                        // need to add title of the page that are in section
                        const path = getPathForSectionAndPage(
                          page.title,
                          section.header ?? section.title,
                          page.slug,
                          section.slug
                        );

                        return (
                          <React.Fragment
                            key={section.id + "mapFooterSections"}
                          >
                            <List.Item>
                              <Link to={path} className={classes.link}>
                                <Text unstyled>
                                  {(section.header ?? section?.title).replace(
                                    ":",
                                    "",
                                  )}
                                </Text>
                              </Link>
                            </List.Item>

                            {/* Careers on accordian on company page */}
                            {/* {page.title === COMPANY_PAGE &&
                              index === getFinalIndex(page) && (
                                <List.Item>
                                  <Link to={CAREERS} className={classes.link}>
                                    <Text unstyled>Careers</Text>
                                  </Link>
                                </List.Item>
                              )} */}

                            {/* Patients section mapping extra elements */}
                            {page.title === PATIENTS_PAGE &&
                              index === getFinalIndex(page) && (
                                <List.Item>
                                  <Anchor
                                    className={classes.link}
                                    href="https://my.phil.us/"
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    underline="never"
                                    unstyled
                                  >
                                    <Text unstyled>Patient Log In</Text>
                                  </Anchor>
                                </List.Item>
                              )}

                            {/* {page.title === CONTACT_PAGE &&
                              index === getFinalIndex(page) && (
                                // <List.Item>
                                <div>
                                  {footer.buttons.map((button, index) => {
                                    const buttonComponent = (
                                      <Button
                                        // className={classes.button}
                                        // size={
                                        //   button.buttonStyle === "Primary"
                                        //     ? buttonConfig.primary.size
                                        //     : buttonConfig.secondary.size
                                        // }
                                        // variant={
                                        //   button.buttonStyle === "Primary"
                                        //     ? buttonConfig.primary.variant
                                        //     : buttonConfig.secondary.variant
                                        // }
                                      >
                                        {button.buttonText}
                                      </Button>
                                    );

                                    return (
                                      // TODO: use sys
                                      <List.Item
                                        key={button.id}
                                        data-noindicator="true"
                                        className={classes.headerCTA}
                                      >
                                        {button.internalLink ? (
                                          <Box ml={index && 16}>
                                            <Link
                                              to={`/${button.internalLink.slug}`}
                                            >
                                              {buttonComponent}{" "}
                                            </Link>
                                          </Box>
                                        ) : (
                                          <Anchor
                                            ml={index && 16}
                                            href={button.externalLink}
                                            target="_blank"
                                          >
                                            {buttonComponent}
                                          </Anchor>
                                        )}
                                      </List.Item>
                                    );
                                  })}
                                </div>

                                // </List.Item>
                              )} */}
                          </React.Fragment>
                        );
                      })}
                  </List>
                </Box>
              </Box>
            );
          })}
      </SimpleGrid>
    </div>
  );
};

export default DesktopFooter;
