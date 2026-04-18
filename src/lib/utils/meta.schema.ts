// lib/utils/schema.ts

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.tuwaiq-ia.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tuwaiq Intelligent Assistant",
    url: `${baseUrl}/`,
    logo: `${baseUrl}/logo.png`,
    sameAs: [`${baseUrl}/`],
  };
}

export function getSoftwareSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tuwaiq Intelligent Assistant",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${baseUrl}/`,
    description:
      locale === "ar"
        ? "منصة ذكاء اصطناعي للمحادثات الذكية وإنشاء الشات بوت للمواقع."
        : "AI platform for smart conversations and website chatbot creation.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tuwaiq Intelligent Assistant",
    url: `${baseUrl}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
