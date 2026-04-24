"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  useVerifyCodeSchema,
  VerifyCodeFields,
} from "@/lib/schemas/auth.schema";
import { useVerifyCode, useVerifyPasswordCode } from "../_hooks/use-auth";

interface VerifyCodeFormProps {
  type?: string;
}

export default function VerifyCodeForm({ type }: VerifyCodeFormProps) {
  const t = useTranslations("auth");

  const isForgotPassword = type === "none";
  const { verifyCode: verifyEmail, isPending: isPendingEmail } =
    useVerifyCode();
  const { verifyCode: verifyPassword, isPending: isPendingPassword } =
    useVerifyPasswordCode();

  const verifyCode = isForgotPassword ? verifyPassword : verifyEmail;
  const isPending = isForgotPassword ? isPendingPassword : isPendingEmail;

  const email = Cookies.get("pending_verification_email");

  const schema = useVerifyCodeSchema();
  const form = useForm<VerifyCodeFields>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  function onSubmit(values: VerifyCodeFields) {
    verifyCode({ ...values });
  }

  const slotClass =
    "w-12 h-12 sm:w-14 sm:h-14 text-xl font-semibold border border-white/20 rounded-lg bg-white/5 transition-all duration-200 hover:border-white/40 data-[active=true]:border-green-500 data-[active=true]:ring-2 data-[active=true]:ring-green-500/30";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md py-5"
      >
        {/* Email hint */}
        {email && (
          <p className="text-center text-sm text-white/50">
            {t("verify-code-sent-to")}{" "}
            <span className="text-white/80 font-medium">{email}</span>
          </p>
        )}

        {/* OTP Input */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-2">
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup dir="ltr" className="gap-2">
                    <InputOTPSlot index={3} className={slotClass} />
                    <InputOTPSlot index={4} className={slotClass} />
                    <InputOTPSlot index={5} className={slotClass} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-white/30" />
                  <InputOTPGroup dir="ltr" className="gap-2">
                    <InputOTPSlot index={0} className={slotClass} />
                    <InputOTPSlot index={1} className={slotClass} />
                    <InputOTPSlot index={2} className={slotClass} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="default"
          disabled={isPending}
          className="w-full h-12 mt-2 text-base font-semibold"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("verifying")}
            </span>
          ) : (
            t("verify-code-submit")
          )}
        </Button>
      </form>
    </Form>
  );
}
