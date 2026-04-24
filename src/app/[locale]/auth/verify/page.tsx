import { Divider } from "@/components/common/divider";
import VerifyCodeForm from "../_components/verify-code-form";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const t = await getTranslations("auth");
  const { type } = await searchParams;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6">
      <h1 className="text-3xl font-bold w-full text-start">
        {t("verify-code-title")}
      </h1>

      {/* Pass type down to form */}
      <VerifyCodeForm type={type} />
      {type === "none" && (
        <>
          <Divider />
          <p className="text-sm text-muted-foreground">
            {t("back-to-login-text")}{" "}
            <Link
              href="/auth/login"
              className="text-[#005F33] underline underline-offset-4 font-medium hover:text-[#005F33]/80 transition-colors"
            >
              {t("back-to-login-link")}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
