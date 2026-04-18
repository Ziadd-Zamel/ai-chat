import {
  getOrganizationSchema,
  getSoftwareSchema,
  getWebsiteSchema,
} from "@/lib/utils/meta.schema";
import Script from "next/script";

interface SeoStructuredDataProps {
  locale: string;
}

export default function SeoStructuredData({ locale }: SeoStructuredDataProps) {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationSchema()),
        }}
      />

      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSoftwareSchema(locale)),
        }}
      />

      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteSchema()),
        }}
      />
    </>
  );
}
