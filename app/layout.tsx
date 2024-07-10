import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { CoreProvider } from "./context/core";
import LoginModal from "./components/shared/loginModal";
import InfoModal from "./components/shared/infoModal";
import RegisterModal from "./components/shared/registerModal";

const Header = dynamic(() => import("./components/layout/header"), {
  ssr: false,
});

import "./styles/global.css";
import "intro.js/introjs.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://blog-point-nine.vercel.app/'),
  title: {
    default: "Historial Médico",
    template: "Historial Médico | %s",
  },
  description: "Blogs de medicina",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [{ name: "Rajesh Prajapati" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icon.png" },
    { rel: "icon", url: "icon.png" },
  ],
  openGraph: {
    title: "Historial Medico",
    description: "Blogs de medicina",
    images: { url: "icon.png" },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CoreProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <LoginModal />
            <RegisterModal />
            <InfoModal />
          </ThemeProvider>
        </CoreProvider>
      </body>
    </html>
  );
}
