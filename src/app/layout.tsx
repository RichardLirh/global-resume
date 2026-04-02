import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Manrope,
} from "next/font/google";
import "./globals.css";
import {
  defaultLocale,
  getResumeContent,
  publicWebsite,
  siteSettings,
} from "@/data/resume";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const defaultContent = getResumeContent(defaultLocale);
const metadataBase = publicWebsite ? new URL(publicWebsite) : undefined;

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: {
    default: `${siteSettings.names.en} | ${defaultContent.ui.metaTitle}`,
    template: `%s | ${siteSettings.names.en}`,
  },
  description: defaultContent.siteConfig.description,
  applicationName: defaultContent.ui.metaTitle,
  keywords: [...defaultContent.ui.metaKeywords],
  ...(metadataBase
    ? {
        alternates: {
          canonical: "/",
          languages: {
            "en-US": "/",
            "zh-CN": "/?lang=zh",
          },
        },
      }
    : {}),
  openGraph: {
    title: `${siteSettings.names.en} | ${defaultContent.ui.metaTitle}`,
    description: defaultContent.siteConfig.description,
    siteName: `${siteSettings.names.en} Resume`,
    type: "website",
    locale: "en_US",
    ...(publicWebsite ? { url: publicWebsite } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.names.en} | ${defaultContent.ui.metaTitle}`,
    description: defaultContent.siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${manrope.variable} ${cormorant.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
