import React from "react"
import {
  Divider,
  Text,
  Group,
  Box,
  List,
  Anchor,
  Accordion,
} from "@mantine/core"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { IconChevronDown } from "@tabler/icons-react"
import isMobileView from "hooks/useView"
import { EmailIcon } from "components/common/Buttons/SocialButtons/EmailIcon"
import { ELinkedinIconDark } from "components/common/Buttons/SocialButtons/ElinkdedInDark"
import * as classes from "./megaFooter.module.css"

type NavLink = { label: string; href: string; external?: boolean }
type NavColumn =
  | { title: string; links: NavLink[]; isCTA?: false }
  | { title: string; isCTA: true }

const NAV_COLUMNS: NavColumn[] = [
  {
    title: "Who We Serve",
    links: [
      { label: "Pharma", href: "/pharma/" },
      { label: "Patients", href: "/patients/" },
      { label: "Providers", href: "/providers/" },
    ],
  },
  {
    title: "Our Solution",
    links: [
      { label: "Overview", href: "/solution/" },
      { label: "Digital Hub", href: "/solution/core/" },
      { label: "Direct-to-Patient", href: "/solution/direct/" },
      { label: "Approach & Impact", href: "/solution/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Customer Stories", href: "/insights/case-studies/" },
      { label: "GTN Calculator", href: "/gtn/" },
      { label: "Resource Hub", href: "/insights/resources/" },
      { label: "Press Library", href: "/insights/press-releases/" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Company", href: "/company/" },
      { label: "Leadership", href: "/leadership/" },
      { label: "Careers", href: "/careers/" },
      { label: "FAQ", href: "/faqs/" },
    ],
  },
  {
    title: "Contact",
    isCTA: true,
  },
]

const LEGAL_LINKS = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "HIPAA Notice", href: "/hipaa" },
]

const NavColumnLinks: React.FC<{ col: NavColumn }> = ({ col }) => {
  if (col.isCTA) {
    return (
      <div className={classes.ctaGroup}>
        <Link to="/demo/" className={classes.btnDemo}>
          Book Demo
        </Link>
        <a
          href="https://my.phil.us/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.btnLogin}
        >
          Patient Login
        </a>
      </div>
    )
  }

  return (
    <List listStyleType="none" spacing={8}>
      {col.links.map((link) => (
        <List.Item key={link.label}>
          {link.external ? (
            <Anchor href={link.href} className={classes.link}>
              {link.label}
            </Anchor>
          ) : (
            <Link to={link.href} className={classes.link}>
              {link.label}
            </Link>
          )}
        </List.Item>
      ))}
    </List>
  )
}

const DesktopFooter: React.FC = () => (
  <div className={classes.desktopGrid}>
    <div className={classes.leftSection}>
      <Box className={classes.logo}>
        <Link to="/">
          <StaticImage
            src="../../../assets/images/phil-logo-green.png"
            alt="PHIL"
            objectFit="contain"
            loading="lazy"
          />
        </Link>
      </Box>

      <div>
        <Text className={classes.addressHeading}>Corporate Headquarters</Text>
        <Text className={classes.addressText}>
          14500 N Northsight Blvd, Suite 307,{" "}
          <br />
          Scottsdale, AZ 85260
        </Text>
      </div>

      <div className={classes.socials}>
        <Anchor href="https://phil.us/contact/" className={classes.socialLink}>
          <Group gap={8}>
            <EmailIcon />
            <Text unstyled span className={classes.socialLink}>
              Contact Us
            </Text>
          </Group>
        </Anchor>
        <Anchor
          href="https://www.linkedin.com/company/phil-inc-"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          <Group gap={8}>
            <ELinkedinIconDark />
            <Text unstyled span className={classes.socialLink}>
              LinkedIn
            </Text>
          </Group>
        </Anchor>
      </div>
    </div>

    <div className={classes.navGrid}>
      {NAV_COLUMNS.map((col) => (
        <Box key={col.title}>
          <Text className={classes.colHeader}>{col.title}</Text>
          <Divider className={classes.colDivider} />
          <NavColumnLinks col={col} />
        </Box>
      ))}
    </div>
  </div>
)

const MobileFooter: React.FC = () => (
  <div className={classes.mobileWrapper}>
    <Accordion
      classNames={{
        item: classes.accordionItem,
        label: classes.accordionLabel,
        control: classes.accordionControl,
        chevron: classes.accordionChevron,
        content: classes.accordionContent,
      }}
      chevron={<IconChevronDown size={24} />}
    >
      {NAV_COLUMNS.map((col) => (
        <Accordion.Item key={col.title} value={col.title}>
          <Accordion.Control>{col.title}</Accordion.Control>
          <Accordion.Panel>
            <NavColumnLinks col={col} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>

    <div className={classes.mobileLeft}>
      <Box className={classes.logo}>
        <Link to="/">
          <StaticImage
            src="../../../assets/images/phil-logo-green.png"
            alt="PHIL"
            objectFit="contain"
            loading="lazy"
          />
        </Link>
      </Box>

      <div>
        <Text className={classes.addressHeading}>Corporate Headquarters</Text>
        <Text className={classes.addressText}>
          14500 N Northsight Blvd, Suite 307, Scottsdale, AZ 85260
        </Text>
      </div>

      <div className={classes.socials}>
        <Anchor href="https://phil.us/contact/" className={classes.socialLink}>
          <Group gap={8}>
            <EmailIcon />
            <Text unstyled span className={classes.socialLink}>
              Contact Us
            </Text>
          </Group>
        </Anchor>
        <Anchor
          href="https://www.linkedin.com/company/phil-inc-"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          <Group gap={8}>
            <ELinkedinIconDark />
            <Text unstyled span className={classes.socialLink}>
              LinkedIn
            </Text>
          </Group>
        </Anchor>
      </div>
    </div>
  </div>
)

const StaticFooter: React.FC<{ minimal?: boolean }> = ({ minimal = false }) => {
  const isMobile = isMobileView("maxSm")
  const currentYear = new Date().getFullYear()

  return (
    <>
      {!minimal && (
        <div className={`xl-container footer-container ${classes.footerMain}`}>
          <Divider size="sm" className={classes.topDivider} mb={{ base: 60, sm: 80 }} />
          {isMobile ? <MobileFooter /> : <DesktopFooter />}
        </div>
      )}

      <div data-minimal={minimal} className={`xl-container ${classes.bottomBar}`}>
        {!isMobile && !minimal && <Divider className={classes.bottomDivider} mb={40} />}
        <Group
          justify={isMobile || minimal ? "center" : "space-between"}
          align="center"
          gap={isMobile ? 8 : 0}
          wrap={isMobile ? "wrap" : "nowrap"}
          py={isMobile ? 16 : 0}
          pb={isMobile || minimal ? 24 : 30}
        >
          {!isMobile && !minimal && (
            <Group gap={12} align="center">
              <img src="/img/soc.png" alt="AICPA SOC" className={classes.badge} />
              <img src="/img/hipaa-compliant.svg" alt="HIPAA Compliant" className={classes.badgeSmall} />
            </Group>
          )}

          <Group
            gap={isMobile ? 4 : 32}
            justify={isMobile || minimal ? "center" : "flex-end"}
            wrap={isMobile ? "wrap" : "nowrap"}
          >
            <Text className={classes.legalText} data-minimal={minimal}>
              {isMobile || minimal
                ? "© PHIL, Inc."
                : `Copyright ${currentYear}, PHIL Inc.`}
            </Text>
            {(isMobile || minimal) && <span className={classes.pipe}>|</span>}
            {LEGAL_LINKS.map((item, i) => (
              <React.Fragment key={item.href}>
                <Link to={item.href} className={classes.legalLink} data-minimal={minimal}>
                  {item.label}
                </Link>
                {(isMobile || minimal) && i < LEGAL_LINKS.length - 1 && (
                  <span className={classes.pipe}>|</span>
                )}
              </React.Fragment>
            ))}
          </Group>
        </Group>
      </div>
    </>
  )
}

export default StaticFooter
