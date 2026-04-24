/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";

export default function WelcomeState() {
  const t = useTranslations("chat");

  return (
    <div className="flex-1 flex flex-col items-center justify-center  text-center px-6 relative">
      {/* Green orb image */}
      <img
        src="/assets/Images/chat-state.svg"
        alt=""
        aria-hidden
        className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-medium text-white leading-snug">
          {t("welcomeTitle")}
        </h1>
        <p className="font-medium text-[#FFFFFFB5]">{t("welcomeSubtitle")}</p>
      </div>
    </div>
  );
}
