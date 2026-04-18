import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";

// Base URL for canonical and OG URLs
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://yourdomain.com";

export const viewport: Viewport = {
  themeColor: "#005F33",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Generate metadata per locale
export async function generateHomeMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    // Title
    title: {
      default: t("home-title"),
      template: `%s | ${t("site-name")}`,
    },

    // Description
    description: t("home-description"),

    // Keywords
    keywords: t("home-keywords")
      .split(",")
      .map((k) => k.trim()),

    // Authors
    authors: [{ name: t("site-name"), url: baseUrl }],

    // Canonical
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },

    // Open Graph
    openGraph: {
      type: "website",
      url: `${baseUrl}/${locale}`,
      siteName: t("site-name"),
      title: t("home-title"),
      description: t("home-description"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("home-title"),
        },
      ],
    },

    // Twitter / X
    twitter: {
      card: "summary_large_image",
      title: t("home-title"),
      description: t("home-description"),
      images: [`${baseUrl}/og-image.png`],
    },

    // Icons
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },

    // Manifest
    manifest: "/manifest.webmanifest",

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification (fill in your own keys)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    },
  };
}
