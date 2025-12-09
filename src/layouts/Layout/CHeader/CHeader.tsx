import {
  Group,
  List,
  Burger,
  Box,
  Anchor,
  Button,
  AppShell,
  Container,
} from "@mantine/core";
import {
  useClickOutside,
  useDisclosure,
  useToggle,
  useViewportSize,
} from "@mantine/hooks";
import classNames from "classnames";
import { graphql, Link } from "gatsby";
import React, { useState } from "react";
import { StaticQuery } from "gatsby";
import type { ContentfulPage } from "types/page";
import slugify from "slugify";
import type { TAsset } from "types/asset";
import Asset from "components/common/Asset/Asset";
import CDrawer from "./CDrawer";
import { type TResource } from "types/resource";
import HeaderContext from "contexts/HeaderProvider";
import CCollapse from "./CCollapse";

import * as classes from "./header.module.css";
import { Navigation } from "./Navigation";

export const HEADER_HEIGHT = 90;

export type ContentfulButton = {
  id: string;
  buttonText: string;
  buttonStyle: string;
  externalLink: string;
  internalLink: ContentfulPage;
  v2flag: boolean;
  link: {
    __typename: string;
    internalContent: Record<string, unknown>;
    externalUrl: string;
    name: string;
    id: string;
  };
};

type CHeaderProps = {
  allContentfulHeader: {
    nodes: Array<{
      logo: TAsset;
      navigationLinks: ContentfulPage[];
      buttons: ContentfulButton[];
    }>;
  };
  allContentfulResource: {
    nodes: Array<Pick<TResource, "id" | "heading" | "relatesTo">>;
  };
  sitePage: {
    id: string;
    pageContext: { title: string; displayTitle: string };
  };
  minimal: boolean;
  headerTargetBlank: boolean;
};

const Navbar: React.FC<CHeaderProps> = ({
  allContentfulHeader,
  allContentfulResource,
  minimal,
  headerTargetBlank,
}) => {
  const [header] = allContentfulHeader.nodes;
  const { navigationLinks: pages, buttons } = header;

  const { width } = useViewportSize();

  const [navRef, setNavRef] = React.useState<HTMLUListElement>();
  const [collapseRef, setCollapseRef] = React.useState<HTMLDivElement>();

  const [opened, { toggle, open, close }] = useDisclosure(false, {
    onClose() {
      setTarget("");
    },
  });

  const [isDrawer, toggleDrawer] = useToggle();

  const [target, setTarget] = useState<string>("");

  const [activePageLI, setActivePageLI] = useState<HTMLLIElement>();

  // useClickOutside(
  //   () => {
  //     close();
  //   },
  //   null,
  //   [navRef!, collapseRef!],
  // );

  // const onNavLinkClick = (event) => {
  //   if (event.target.textContent === target) {
  //     toggle();
  //   } else {
  //     open();
  //     setTarget(event.target.textContent as string);
  //   }
  // };

  // function moveIntidatorActiveTo(li: HTMLLIElement) {
  //   if (li.dataset.noindicator === "true") {
  //     return;
  //   }

  //   const INDICATOR_SIZE = 20;
  //   const INITIAL_OFFSET = 25;
  //   const indicator: HTMLElement = document.querySelector(
  //     `.${classes.indicator}`,
  //   )!;

  //   li.classList.add("active");

  //   indicator.style.transform = `translate(calc(${
  //     li.offsetLeft - INITIAL_OFFSET - INDICATOR_SIZE + li.clientWidth / 2
  //   }px), calc(${-INDICATOR_SIZE}px))`;
  // }

  // React.useEffect(() => {
  //   if (!minimal) {
  //     const navBar = document.querySelector(".navbar")!;
  //     const allLi = navBar.querySelectorAll("li");

  //     console.log(allLi)

  //     const clickHandlers: Array<(e: MouseEvent) => void> = [];

  //     allLi.forEach((li) => {
  //       if (li.dataset.noindicator === "true") {
  //         return;
  //       }

  //       const titleToMatch = li.innerText.trim();

  //       const [currentPage] = pages.filter(
  //         (page) => page.title === titleToMatch,
  //       );

  //       // Initial set active
  //       if (
  //         location.pathname === "/"
  //           ? false
  //           : location.pathname.startsWith(
  //               `/${slugify(currentPage.title, { lower: true, strict: true })}/`,
  //             )
  //       ) {
  //         setActivePageLI(li);
  //         li.classList.add("active");
  //         moveIntidatorActiveTo(li);
  //       }

  //       const clickEventHandler = (e: MouseEvent) => {
  //         e.preventDefault(); // Preventing from submitting
  //         const active = navBar.querySelector(".active");
  //         if (active) {
  //           active.classList.remove("active");
  //         }

  //         moveIntidatorActiveTo(li);
  //       };

  //       clickHandlers.push(clickEventHandler);

  //       li.addEventListener("click", clickEventHandler);
  //     });

  //     return () => {
  //       allLi.forEach((li, index) => {
  //         li.removeEventListener("click", clickHandlers[index]);
  //       });
  //     };
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (!minimal) {
  //     const navBar = document.querySelector(".navbar")!;
  //     const active = navBar.querySelector(".active");

  //     if (Boolean(!opened) && Boolean(activePageLI)) {
  //       if (activePageLI!.dataset.noindicator === "true") {
  //         return;
  //       }

  //       if (active) {
  //         active.classList.remove("active");
  //       }

  //       moveIntidatorActiveTo(activePageLI!);
  //     } else if (Boolean(!opened) && Boolean(!activePageLI)) {
  //       const active = navBar.querySelector(".active");
  //       if (active) {
  //         active.classList.remove("active");
  //       }

  //       const indicator: HTMLElement = document.querySelector(
  //         `.${classes.indicator}`,
  //       )!;
  //       indicator.style.transform = "";
  //     }
  //   }
  // }, [opened, activePageLI]);

  // React.useEffect(() => {
  //   if (!minimal) {
  //     const navBar = document.querySelector(".navbar")!;
  //     const active: HTMLLIElement = navBar.querySelector(".active")!;

  //     if (active) {
  //       moveIntidatorActiveTo(active);
  //     }
  //   }
  // }, [width]);

  const buttonConfig = {
    primary: { variant: "header-primary", size: "md", uppercase: true },
    secondary: { variant: "header-secondary", size: "md", uppercase: true },
  };

  return (
    <AppShell.Header className={classes.header} style={{ borderBottom: 0, position:'relative' }}>
      <Container size="xl">
      <Group
        align="center"
        justify="space-between"
        gap={0}
        className={classNames(classes.navbar, "navbar")}
      >
        <Box className={classes.logo}>
          {headerTargetBlank ? (
            <Anchor href="https://phil.us" target="_blank">
              <Asset asset={header.logo} objectFit="contain" />
            </Anchor>
          ) : (
            <Link to="/">
              <Asset asset={header.logo} objectFit="contain" />
            </Link>
          )}
        </Box>
        {!minimal && (
          <>
            <Burger
              name="BurgerButton"
              opened={isDrawer}
              onClick={() => {
                toggleDrawer();
              }}
              className={classes.burger}
            />
            <List ref={setNavRef} className={classes.navLinksWrapper}>

              <Navigation pages={pages} />

              {buttons.map((button, index) => {
                const buttonComponent = (
                  <Button
                    className={classes.button}
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
                      <Box ml={index && 16}>
                        <Link to={`/${button.internalLink.slug}`}>
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
            </List>
          </>
        )}
      </Group>
      {!minimal && (
        <HeaderContext.Provider
          value={{
            minimal,
            allContentfulResource,
            header,
            isDrawer,
            pages,
            toggleDrawer,
            opened,
            setCollapseRef,
            target,
            close,
            buttons,
          }}
        >
          {isDrawer && <CDrawer />}
        </HeaderContext.Provider>
      )}
      </Container>
    </AppShell.Header>
  );
};

// const query = graphql`
//   query {
//     allContentfulHeader(filter: { node_locale: { eq: "en-US" } }) {
//       nodes {
//         id
//         title
//         navigationLinks {
//           slug
//           id
//           title
//           displayTitle
//           sys {
//             contentType {
//               sys {
//                 id
//                 type
//               }
//             }
//           }
//           sections {
//             ... on ContentfulReferencedSection {
//               id
//               header
//               headerAlias
//               isHidden
//               hideNavigationAnchor
//             }
//             ... on ContentfulSection {
//               id
//               header
//               isHidden
//               hideNavigationAnchor
//             }
//           }
//         }
//         logo {
//           gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
//           title
//           file {
//             contentType
//             details {
//               size
//             }
//             url
//           }
//         }
//         buttons {
//           id
//           buttonText
//           buttonStyle
//           externalLink
//           internalLink {
//             ... on ContentfulPage {
//               slug
//               id
//               title
//             }
//           }
//         }
//       }
//     }
//     allContentfulResource(filter: { node_locale: { eq: "en-US" } }) {
//       nodes {
//         id
//         heading
//         relatesTo {
//           ... on ContentfulReferencedSection {
//             id
//             header
//           }
//           ... on ContentfulSection {
//             id
//             header
//           }
//         }
//       }
//     }
//     sitePage {
//       id
//       pageContext
//     }
//   }
// `;

const query = graphql`

{
  allContentfulHeader(filter: { node_locale: { eq: "en-US" } }) {
    nodes {
      id
      title
      navigationLinks {
        slug
        id
        title
        displayTitle
        sys {
          contentType {
            sys {
              id
              type
            }
          }
        }
        sections {
          ... on ContentfulReferencedSection {
            id
            __typename
            header
            headerAlias
            isHidden
            hideNavigationAnchor
          }
          ... on ContentfulSection {
            id
            __typename
            header
            isHidden
            hideNavigationAnchor
          }
          ... on ContentfulTextAndTextColumns {
            id
            __typename
            header
            hideNavigationAnchor
          }
          ... on ContentfulPage {
            id
            __typename
            title
            slug
            navbarTitle
          }
        }
      }
      logo {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        title
        file {
          contentType
          details {
            size
          }
          url
        }
      }
      buttons {
        id
        buttonText
        buttonStyle
        externalLink
        internalLink {
          ... on ContentfulPage {
            slug
            id
            title
          }
        }
      }
    }
  }
  allContentfulResource(filter: { node_locale: { eq: "en-US" } }) {
    nodes {
      id
      heading
      relatesTo {
        ... on ContentfulReferencedSection {
          id
          header
        }
        ... on ContentfulSection {
          id
          header
        }
      }
    }
  }
  sitePage {
    id
    pageContext
  }
}

`;

const CHeader: React.FC<{ minimal: boolean; headerTargetBlank?: boolean }> = ({
  minimal,
  headerTargetBlank,
}) => (
  <StaticQuery
    query={query}
    render={(props) => (
      <Navbar
        minimal={minimal}
        headerTargetBlank={headerTargetBlank}
        {...props}
      />
    )}
  />
);

export default CHeader;
