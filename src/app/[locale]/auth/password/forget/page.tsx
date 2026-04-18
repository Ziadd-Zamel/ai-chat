import { Divider } from "@/components/common/divider";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ForgotPasswordForm from "../../_components/forgot-password-form";

export default async function Page() {
  const t = await getTranslations("auth");

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold w-full text-start">
        {t("forgot-password-title")}
      </h1>

      {/* Forgot password form */}
      <ForgotPasswordForm />

      {/* Divider line */}
      <Divider />

      {/* Back to login prompt */}
      <p className="text-sm text-muted-foreground">
        {t("back-to-login-text")}{" "}
        <Link
          href="/auth/login"
          className="text-[#005F33] underline underline-offset-4 font-medium hover:text-[#005F33]/80 transition-colors"
        >
          {t("back-to-login-link")}
        </Link>
      </p>
    </div>
  );
}
