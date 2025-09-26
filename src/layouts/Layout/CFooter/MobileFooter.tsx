import {
  Box,
  Text,
  Accordion,
  List,
  Anchor,
  Group,
  Grid,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Asset from "components/common/Asset/Asset";
import ImageContainer from "components/common/Container/ImageContainer";
import { CONTACT_PAGE } from "constants/page";
import { CAREERS, LEADERSHIP } from "constants/routes";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { type TAsset } from "types/asset";
import { type ContentfulPage } from "types/page";
import { getFinalIndex } from "utils/getFinalIndex";
import { getPathForSectionAndPage } from "utils/links";
import * as classes from "./mobileFooter.module.css";
import { BodyType } from "types/section";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";
import { EmailIcon } from "components/common/Buttons/SocialButtons/EmailIcon";

type TMobileFooter = {
  pages: ContentfulPage[];
  footer: {
    badge: TAsset[];
    navigationLinks: ContentfulPage[];
    logo: TAsset;
    address: BodyType;
  };
};

const MobileFooter: React.FC<TMobileFooter> = ({ pages, footer }) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_4](node, children) {
        return <Title className={cx(classes.heading4)}>{children}</Title>;
      },

      [BLOCKS.PARAGRAPH](node, children) {
        return <Title className={cx(classes.paragraph)}>{children}</Title>;
      },
    },
  };

  return (
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
        {pages
          .filter((page) => page.title !== "Home")
          .map((page) => (
            <Accordion.Item
              key={page.id + "mapFooterPagesMobile"}
              value={page.title}
            >
              <Accordion.Control>{page.title}</Accordion.Control>
              <Accordion.Panel>
                <List mb={16} listStyleType={"none"}>
                  {page.title === CONTACT_PAGE && (
                    <div className={classes.contact}>
                      <Group gap={4}>
                        <EmailIcon />
                        <Anchor href="https://phil.us/contact/" className={classes.link}>
                        <Text
                          unstyled
                          span
                          data-manual-entry={true}
                          className={classes.link}
                        >
                           Contact Us
                        </Text>
                        </Anchor>
                      </Group>
                      <Anchor
                        href="https://www.linkedin.com/company/phil-inc-"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className={classes.link}
                      >
                        <Group gap={4}>
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
                  )}

                  {page.sections
                    .filter((section) =>
                      Boolean(
                        (section.header?.length || section.title?.length) &&
                          !section.isHidden &&
                          !section?.hideNavigationAnchor &&
                          section.header !== "Contact us",
                      ),
                    )
                    .map((section, index) => {
                      const path = getPathForSectionAndPage(
                        page.title,
                        section.header ?? section.title,
                        page.slug,
                        section.slug,
                      );

                      return (
                        <React.Fragment
                          key={section.id + "mapFooterSectionsMobile"}
                        >
                          <List.Item>
                            <Link to={path} className={classes.footerLink}>
                              <Text className={classes.footerSection}>
                                {(section?.navbarTitle ?? section.header ?? section.title).replace(
                                  ":",
                                  "",
                                )}
                              </Text>
                            </Link>
                          </List.Item>
                        </React.Fragment>
                      );
                    })}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
      </Accordion>

      <div className={classes.footerContent}>
        <Box className={classes.logo}>
          <Link to="/">
            <Asset asset={footer.logo} objectFit="contain" />
          </Link>
        </Box>

        <div>{footer.address && renderRichText(footer.address, options)}</div>
      </div>

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
};

export default MobileFooter;
