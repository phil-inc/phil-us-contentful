import {
  Text,
  Drawer,
  Group,
  Anchor,
  Button,
  Box,
  Burger,
  Accordion,
  useMantineTheme,
  List,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Asset from "components/common/Asset/Asset";
import { Link } from "gatsby";
import React from "react";
import { getPathForSectionAndPage } from "utils/links";
import { Link as ScrollToElement } from "react-scroll";
import HeaderContext from "contexts/HeaderProvider";
import { COMPANY_PAGE, PATIENTS_PAGE } from "constants/page";
import { getFinalIndex } from "utils/getFinalIndex";
import { CAREERS } from "constants/routes";

import * as classes from "./drawer.module.css";

/**
 * Represents a custom drawer component.
 * @component
 */
const CDrawer: React.FC = () => {
  const { header, isDrawer, pages, toggleDrawer, buttons } =
    React.useContext(HeaderContext);

  const buttonConfig = {
    primary: { variant: "header-primary", size: "md", uppercase: true },
    secondary: { variant: "header-secondary", size: "md", uppercase: true },
  };

  const [firstButton, secondButton] = buttons;

  const firstButtonComponent = (
    <Button
      size="sm"
      radius={0}
      variant={
        buttons?.[0].buttonStyle === "Primary"
          ? buttonConfig.primary.variant
          : buttonConfig.secondary.variant
      }
      px={4}
      className={classes.patientLoginButtonMobile}
    >
      Patient Login
    </Button>
  );

  const secondButtonComponent = (
    <Button
      className={classes.button}
      size={
        secondButton.buttonStyle === "Primary"
          ? buttonConfig.primary.size
          : buttonConfig.secondary.size
      }
      variant={
        secondButton.buttonStyle === "Primary"
          ? buttonConfig.primary.variant
          : buttonConfig.secondary.variant
      }
      fullWidth
    >
      {secondButton.buttonText}
    </Button>
  );

  return (
    <Drawer
      classNames={{ header: classes.drawerHeader, body: classes.drawerBody }}
      opened={isDrawer}
      onClose={() => {
        toggleDrawer(false);
      }}
      withCloseButton={false}
      size="100%"
      transitionProps={{ transition: "fade" }}
    >
      <Group justify="space-between" wrap="nowrap" align="center" mb="sm">
        {firstButton.internalLink ? (
          <Box>
            <Link to={`/${firstButton.internalLink.slug}`}>
              {firstButtonComponent}{" "}
            </Link>
          </Box>
        ) : (
          <Anchor
            className={classes.hideOnLarge}
            href={firstButton.externalLink}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {firstButtonComponent}
          </Anchor>
        )}

        <Box className={classes.logo}>
          <Link to="/">
            <Asset asset={header.logo} objectFit="contain" />
          </Link>
        </Box>

        <Burger
          opened={true}
          onClick={() => {
            toggleDrawer();
          }}
          className={classes.burger}
        />
      </Group>

      <Accordion
        mb={16}
        classNames={{
          control: classes.control,
          content: classes.content,
          label: classes.label,
          chevron: classes.chevron,
          item: classes.item,
        }}
        chevron={<IconChevronDown size={24} />}
      >
        {pages
          .filter((page) => page.title !== "Home")
          .map((page) => (
            <Accordion.Item
              key={page.id + "mapHeaderPagesDrawer"}
              value={page.title}
            >
              <Accordion.Control>{page.title}</Accordion.Control>
              <Accordion.Panel>
                <List
                  spacing={0}
                  listStyleType="none"
                  mb="sm"
                  classNames={{ item: classes.listItem }}
                >
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
                          key={section.id + "mapHeaderPageSectionsDrawer"}
                        >
                          <List.Item py="xs">
                            {/* All sections except for the first */}

                            {page.title === document.title &&
                            page.title !== "Resources" ? (
                              <ScrollToElement
                                to={path}
                                spy={true}
                                smooth={true}
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                              >
                                {section.header}
                              </ScrollToElement>
                            ) : (
                              <Link to={path} className={classes.link}>
                                {section.header}
                              </Link>
                            )}
                          </List.Item>

                          {/* Add Patient Login to mobile drawer under patiens accordian */}
                          {page.title === PATIENTS_PAGE &&
                            index === getFinalIndex(page) && (
                              <List.Item py="xs">
                                <Anchor
                                  href="https://my.phil.us/"
                                  target="_blank"
                                  className={classes.link}
                                >
                                  Patient Log In
                                </Anchor>
                              </List.Item>
                            )}

                          {/* Add Careers mobile drawer under company accordian */}
                          {page.title === COMPANY_PAGE &&
                            index === getFinalIndex(page) && (
                              <List.Item>
                                <Link
                                  to={CAREERS}
                                  style={{ textDecoration: "none" }}
                                >
                                  <Text size={"16px"} fw={"400"}>
                                    Careers
                                  </Text>
                                </Link>
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

      {secondButton.internalLink ? (
        <Box key={secondButton.id} mt={16}>
          <Link to={`/${secondButton.internalLink.slug}`}>
            {secondButtonComponent}
          </Link>
        </Box>
      ) : (
        <Anchor
          mt={16}
          href={secondButton.externalLink}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          {secondButtonComponent}
        </Anchor>
      )}
    </Drawer>
  );
};

export default CDrawer;
