import { getTranslations } from "next-intl/server";
import { Divider } from "@/components/common/divider";

export default async function ComingSoonPage() {
  const t = await getTranslations("comingSoon");

  return (
    <main className="relative min-h-screen bg-[#0A0F0C] flex flex-col overflow-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#005F33]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#005F33]/5 blur-[80px]" />
        <div className="absolute top-1/2 right-0 w-[200px] h-[200px] rounded-full bg-[#00A854]/5 blur-[60px]" />
      </div>

      {/* Grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#005F33 1px, transparent 1px), linear-gradient(90deg, #005F33 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center flex-1 px-6 text-center gap-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#303834] bg-[#233A2E33] rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A854] animate-pulse" />
          <span className="text-xs text-[#00A854] font-medium tracking-widest uppercase">
            {t("badge")}
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-7xl font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {t("title-line1")}
          <br />
          <span className="text-[#005F33]">{t("title-line2")}</span>
        </h1>

        {/* Divider */}
        <div className="w-48">
          <Divider />
        </div>

        {/* Description */}
        <p className="text-base text-[#6B8F7A] max-w-md leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Bottom divider */}
      <Divider />

      {/* Footer */}
      <div className="relative flex items-center justify-center py-4">
        <p className="text-xs text-[#6B8F7A]">{t("footer")}</p>
      </div>
    </main>
  );
}
