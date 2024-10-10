import {
  Box,
  Divider,
  List,
  Anchor,
  Group,
  Text,
  SimpleGrid,
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
import { CAREERS } from "constants/routes";

import * as classes from "./desktopFooter.module.css";

type TDesktopFooter = {
  pages: ContentfulPage[];
  footer: {
    badge: TAsset[];
    navigationLinks: ContentfulPage[];
  };
};

const DesktopFooter: React.FC<TDesktopFooter> = ({ pages, footer }) => (
  <SimpleGrid
    classNames={{ root: classes.root }}
    cols={{ base: 4, sm: 2, md: 3, lg: 4 }}
    spacing={20}
    verticalSpacing={20}
  >
    {pages.map((page) => {
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
            <Link to={path} className={classes.link}>
              <Text className={classes.header} unstyled>
                {page.title}
              </Text>
            </Link>
            <Divider className={classes.divider} />
            <List listStyleType="none" spacing={8}>
              {page.sections
                .filter((section) =>
                  Boolean(
                    section.header?.length &&
                      !section.isHidden &&
                      !section?.hideNavigationAnchor,
                  ),
                )
                .map((section, index) => {
                  const path = getPathForSectionAndPage(
                    page.title,
                    section.header,
                    page.slug,
                  );

                  return (
                    <React.Fragment key={section.id + "mapFooterSections"}>
                      <List.Item>
                        <Link to={path} className={classes.link}>
                          <Text unstyled>
                            {section.header.replace(":", "")}
                          </Text>
                        </Link>
                      </List.Item>

                      {/* Careers on accordian on company page */}
                      {page.title === COMPANY_PAGE &&
                        index === getFinalIndex(page) && (
                          <List.Item>
                            <Link to={CAREERS} className={classes.link}>
                              <Text unstyled>Careers</Text>
                            </Link>
                          </List.Item>
                        )}

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

                      {page.title === CONTACT_PAGE &&
                        index === getFinalIndex(page) && (
                          <List.Item>
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
                          </List.Item>
                        )}
                    </React.Fragment>
                  );
                })}
            </List>
          </Box>
        </Box>
      );
    })}
  </SimpleGrid>
);

export default DesktopFooter;
