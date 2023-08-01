import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { Inter } from "next/font/google";
import Header from "./components/layout/header";
import { theme } from "./theme";
import { CoreProvider } from "./context/core";
import LoginModal from "./components/shared/loginModal";
import InfoModal from "./components/shared/infoModal";
import RegisterModal from "./components/shared/registerModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
