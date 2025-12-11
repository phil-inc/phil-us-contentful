import { Anchor, Button, createTheme } from "@mantine/core";

import * as classes from "./theme.module.css";

export const addyiTheme = createTheme({
  breakpoints: {
    xs: "22.5em", // Adjusted for common mobile devices
    sm: "48em", // Common tablet size (portrait orientation)
    md: "64em", // ipad pro size
    lg: "85em", // Adjusted for common desktop resolutions
    xl: "120em", // Retained for larger screens, beyond typical desktop resolutions
  },
  colors: {
    addyiBranding: [
      "#FFE7F9", // 0 - lightest (secondary background)
      "#FFD4F0", // 1
      "#FFB8E3", // 2
      "#FF9BD6", // 3
      "#E0097E", // 4 - primary (header background)
      "#C0086B", // 5
      "#A00758", // 6 - dark
      "#800645", // 7
      "#600533", // 8
      "#400322", // 9 - darkest
    ],
  },
  primaryColor: "addyiBranding",
  headings: {
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: "60px",
        lineHeight: "1",
      },
      h2: {
        fontSize: "40px",
        lineHeight: "1",
      },
      h3: {
        fontSize: "28px",
        lineHeight: "1",
      },
      h4: {
        fontSize: "20px",
        lineHeight: "1",
      },
      h5: {
        fontSize: "min(24px, calc(1rem + 0.989vw))",
        lineHeight: "1.3",
      },
      h6: {
        fontSize: "min(18px, calc(1rem + 0.989vw))",
        lineHeight: "1.3",
      },
    },
    fontFamily: "Raleway, sans-serif",
  },
  fontFamily: "Lato, sans-serif",

  spacing: {
    xs: "8px",
    sm: "16px",
    md: "32px",
    lg: "64px",
    xl: "128px",
  },

  components: {
    Button: Button.extend({
      classNames: {
        root: classes.root,
        label: classes.label,
        loader: classes.loader,
      },
    }),

    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'always',
      },
    }),
  },
});

