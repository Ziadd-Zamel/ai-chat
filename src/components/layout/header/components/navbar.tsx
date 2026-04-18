"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/common/divider";
import LanguageSwitcher from "./language-switcher";

export default function Navbar() {
  const t = useTranslations("header");
  const pathname = usePathname();

  // Hide auth buttons on all auth routes
  const isAuthRoute = pathname.includes("/auth");

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Nav links — start side */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/apps"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("apps")}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* End side — language switcher + auth buttons */}
        <div className="flex items-center gap-3">
          {/* Language switcher — always visible */}
          <LanguageSwitcher />

          {/* Auth buttons — hidden on auth routes */}
          {!isAuthRoute && (
            <>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth/register">{t("register")}</Link>
              </Button>
              <Button asChild variant="default" size="lg">
                <Link href="/auth/login">{t("login")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
