import { Divider } from "@/components/common/divider";
import LoginForm from "../_components/login-form";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Page() {
  const t = await getTranslations("auth");

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold w-full text-start">
        {t("login-title")}
      </h1>

      {/* Login form */}
      <LoginForm />

      {/* Divider line */}
      <Divider />

      {/* Sign up prompt */}
      <p className="text-sm text-muted-foreground">
        {t("no-account")}{" "}
        <Link
          href="/auth/register"
          className="text-[#005F33] underline underline-offset-4 font-medium hover:text-[#005F33]/80 transition-colors"
        >
          {t("create-account")}
        </Link>
      </p>
    </div>
  );
}
