"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    
    primary: {
      dark: "#7D7463",
      main: "#787760",
      light: "#B2A896",
    },
    secondary: {
      main: "#0B666A",
      light: "#148679",
    },
    background: {
      default: "#B2A896",
    },
    text: {
      primary: "#2F4858",
    },
  },
  typography: {
    h1: { fontFamily: "Merriweather", fontSize:'3rem' },
    h2: { fontFamily: "Merriweather" },
    h3: { fontFamily: "Merriweather" },
    h4: { fontFamily: "Merriweather" },
    h5: { fontFamily: "Merriweather" },
    h6: { fontFamily: "Merriweather" },
    body1: { fontFamily: "OpenSans" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Merriweather';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Merriweather'), local('Merriweather-Regular'), url('/fonts/merriweather/Merriweather-Regular.ttf') format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        };
        @font-face {
            font-family: 'OpenSans';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('OpenSans'), local('OpenSans'), url('/fonts/open-sans/OpenSans.ttf') format('truetype');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
      `,
    },
  },
});

export { theme };

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
