import type { Metadata } from "next";
import { Geist_Mono, Inter, Zain } from "next/font/google";
import Providers from "@/components/providers";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Script from "next/script";

const zain = Zain({
  subsets: ["arabic"],
  variable: "--font-zain",
  weight: ["400", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Tuwaiq Intelligent Assistant | مساعد ذكاء اصطناعي ومنصة إنشاء شات بوت للمواقع",
  description:
    "Tuwaiq Intelligent Assistant منصة ذكاء اصطناعي للمحادثات الذكية وإنشاء الشات بوت للمواقع. تواصل مع مساعد ذكي وأنشئ شات بوت لموقعك لخدمة العملاء والدعم والتفاعل مع الزوار.",
  keywords:
    "Tuwaiq Intelligent Assistant, طويق الذكي, مساعد ذكاء اصطناعي, شات بوت, شات بوت للمواقع, إنشاء شات بوت, منصة ذكاء اصطناعي, دردشة ذكية, بوت خدمة العملاء",
  other: {
    "google-adsense-account": "ca-pub-1238102502589678",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const fontSansBody =
    locale === "ar"
      ? "var(--font-zain), system-ui, sans-serif"
      : "var(--font-en), ui-sans-serif, system-ui, sans-serif";

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        "h-full antialiased",
        zain.variable,
        inter.variable,
        geistMono.variable,
        locale === "ar" ? zain.className : inter.className,
      )}
      style={{ "--font-sans-body": fontSansBody } as React.CSSProperties}
    >
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1238102502589678"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body>
        <Providers>
          <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
