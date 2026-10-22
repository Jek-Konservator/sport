import React from "react";
import { Manrope } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@ui/MantineProvider";
import { Layout } from "@features/Layout";
import { Providers } from "./providers";

const font = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Сила за 6 недель", template: "%s · Сила за 6 недель" },
  description: "Программа тренировок: отжимания, пресс и приседания с таймером отдыха",
};

export const viewport: Viewport = {
  themeColor: "#fd7e14",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html className={font.variable} lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
