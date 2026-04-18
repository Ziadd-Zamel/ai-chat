"use client";
import { useTranslations, useLocale } from "next-intl";
import { usePathname as useI18nPathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Locale display labels
const localeLabels: Record<string, string> = {
  en: "EN",
  ar: "ع",
};

const localeFullLabels: Record<string, string> = {
  en: "English",
  ar: "العربية",
};

// Language switcher redesigned to match green dark theme
export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("header");
  const locale = useLocale();
  const i18nPathname = useI18nPathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("languageSwitcherLabel")}
          className={cn(
            // Match input/button style — same border color and bg
            "inline-flex items-center gap-1.5 rounded-lg border-[0.5px] border-[#303834] bg-[#233A2E33]",
            "h-9 px-3 text-sm font-medium text-white tracking-wide cursor-pointer",
            "transition-colors duration-200",
            "hover:border-[#4A7A60] hover:bg-[#233A2E66]",
            "focus-visible:outline-none focus-visible:border-[#4A7A60] focus-visible:ring-3 focus-visible:ring-[#4A7A60]/30",
            "active:bg-[#233A2E4D]",
            className,
          )}
        >
          {/* Globe icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="shrink-0 text-[#00A854]"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span className="text-[#00A854]">
            {localeLabels[locale] ?? locale.toUpperCase()}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[10rem]">
        <DropdownMenuLabel>{t("languageSwitcherLabel")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(next) => {
            if (next !== locale) router.replace(i18nPathname, { locale: next });
          }}
        >
          {routing.locales.map((loc) => (
            <DropdownMenuRadioItem
              className="cursor-pointer"
              key={loc}
              value={loc}
            >
              {localeFullLabels[loc] ?? loc}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
