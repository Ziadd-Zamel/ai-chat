import ComingSoonPage from "@/components/common/coming-soon-page";
import { generateHomeMetadata } from "@/lib/utils/metadata";
import { Metadata } from "next";

// Generate metadata per locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export default async function Home() {
  return <ComingSoonPage />;
}
