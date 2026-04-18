import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.tuwaiq-ia.com";

export const viewport: Viewport = {
  themeColor: "#005F33",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateHomeMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  const isArabic = locale === "ar";

  const title = t("home-title");
  const description = t("home-description");
  const keywords = t("home-keywords")
    .split(",")
    .map((k) => k.trim());

  const canonical = isArabic ? `${baseUrl}/ar` : `${baseUrl}/en`;

  return {
    title,
    description,
    keywords,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },

    openGraph: {
      locale: isArabic ? "ar_SA" : "en_US",
      type: "website",
      siteName: t("site-name"),
      title,
      description: isArabic
        ? "منصة ذكاء اصطناعي للمحادثات الذكية وإنشاء الشات بوت للمواقع لخدمة العملاء والدعم والتفاعل مع الزوار."
        : "AI platform for smart conversations and website chatbot creation for customer support and visitor engagement.",
      url: canonical,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Tuwaiq Intelligent Assistant platform preview",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: isArabic
        ? "منصة ذكاء اصطناعي للمحادثات الذكية وإنشاء الشات بوت للمواقع لخدمة العملاء والدعم والتفاعل مع الزوار."
        : "AI platform for smart conversations and website chatbot creation for customer support and visitor engagement.",
      images: [`${baseUrl}/og-image.jpg`],
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    manifest: "/manifest.webmanifest",

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },

    other: {
      "application-name": t("site-name"),
    },
  };
}
