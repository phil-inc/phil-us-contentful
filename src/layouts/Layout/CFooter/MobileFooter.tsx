import { Box, Text, Accordion, List, Anchor, Group, Grid } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Asset from "components/common/Asset/Asset";
import ImageContainer from "components/common/Container/ImageContainer";
import { COMPANY_PAGE, PATIENTS_PAGE } from "constants/page";
import { CAREERS, EXECUTIVE_TEAM } from "constants/routes";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { type TAsset } from "types/asset";
import { type ContentfulPage } from "types/page";
import { getFinalIndex } from "utils/getFinalIndex";
import { getPathForSectionAndPage } from "utils/links";
import * as classes from "./mobileFooter.module.css";

type TMobileFooter = {
  pages: ContentfulPage[];
  footer: {
    badge: TAsset[];
    navigationLinks: ContentfulPage[];
  };
};

const MobileFooter: React.FC<TMobileFooter> = ({ pages, footer }) => (
  <Box className={classes.footerWrapper}>
    <Accordion
      classNames={{
        content: classes.content,
        item: classes.item,
        label: classes.label,
        control: classes.control,
        chevron: classes.chevron,
      }}
      chevron={<IconChevronDown size={24} />}
      mb={15}
    >
      {pages.map((page) => (
        <Accordion.Item
          key={page.id + "mapFooterPagesMobile"}
          value={page.title}
        >
          <Accordion.Control>{page.title}</Accordion.Control>
          <Accordion.Panel>
            <List mb={16} listStyleType={"none"}>
              {page.title === COMPANY_PAGE && (
                <List.Item>
                  <Link to={EXECUTIVE_TEAM} className={classes.footerLink}>
                  <Text className={classes.footerSection}>Executive Team</Text>
                  </Link>
                </List.Item>
              )}

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
                    <React.Fragment
                      key={section.id + "mapFooterSectionsMobile"}
                    >
                      <List.Item>
                        <Link to={path} className={classes.footerLink}>
                          <Text className={classes.footerSection}>
                            {section.header.replace(":", "")}
                          </Text>
                        </Link>
                      </List.Item>

                      {/* Patient login on accordian on patients page */}
                      {page.title === PATIENTS_PAGE &&
                        index === getFinalIndex(page) && (
                          <List.Item>
                            <Anchor
                              href="https://my.phil.us/"
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className={classes.link}
                            >
                              <Text className={classes.footerLink}>
                                Patient Log In
                              </Text>
                            </Anchor>
                          </List.Item>
                        )}

                      {/* Careers on accordian on company page */}
                      {page.title === COMPANY_PAGE &&
                        index === getFinalIndex(page) && (
                            <List.Item>
                              <Link
                                to={CAREERS}
                                className={classes.footerLink}
                                // style={{ textDecoration: "none" }}
                              >
                                <Text className={classes.footerSection}>
                                  Careers
                                </Text>
                              </Link>
                            </List.Item>
                        )}

                      {/* Socials on contact accordian on mobile */}
                      {page.title === "Contact" &&
                        index === page.sections.length - 1 && (
                          <List.Item>
                            <Group>
                              <Anchor
                                href="https://www.linkedin.com/company/phil-inc-"
                                target="_blank"
                              >
                                <div>
                                  <StaticImage
                                    src="../../../assets/images/linkedin.svg"
                                    alt="LinkedIn Icon"
                                  />
                                </div>
                              </Anchor>
                            </Group>
                          </List.Item>
                        )}
                    </React.Fragment>
                  );
                })}
            </List>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>

    <Grid mt={60} align={"center"} justify="center">
      {footer.badge.map((badge) => (
        <Grid.Col key={badge.file.url + "mapBadgeMobile"} span={4}>
          <Box maw={120}>
            <ImageContainer fluid>
              <Asset objectFit="contain" asset={badge} />
            </ImageContainer>
          </Box>
        </Grid.Col>
      ))}
    </Grid>
  </Box>
);

export default MobileFooter;
