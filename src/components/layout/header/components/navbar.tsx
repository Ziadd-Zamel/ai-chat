"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";
import UserMenu from "./user-menu";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const t = useTranslations("header");
  const pathname = usePathname();

  const isAuthRoute = pathname.includes("/auth");

  return (
    <header className="w-full bg-transparent">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Nav links */}
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

        {/* End side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* ✅ Logged in → show user menu */}
          {session?.user ? (
            <UserMenu name={session.user.name} email={session.user.email} />
          ) : (
            // ✅ Not logged in + not on auth route → show auth buttons
            !isAuthRoute && (
              <>
                <Button asChild variant="outline" size="lg">
                  <Link href="/auth/register">{t("register")}</Link>
                </Button>
                <Button asChild variant="default" size="lg">
                  <Link href="/auth/login">{t("login")}</Link>
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
