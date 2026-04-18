"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useVerifyCode } from "../_hooks/use-auth";

export default function VerifyCodeForm() {
  // Translations
  const t = useTranslations("auth");

  const { verifyCode, isPending } = useVerifyCode();

  // Schema & form setup with validation
  const schema = useVerifyCodeSchema();
  const form = useForm<VerifyCodeFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  // Handles form submission to verify the OTP code
  function onSubmit(values: VerifyCodeFields) {
    verifyCode(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md py-5"
      >
        {/* OTP Code Input field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup dir="ltr">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup dir="ltr">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="default"
          className="w-full h-9 sm:h-12 mt-5"
        >
          {t("verify-code-submit")}
        </Button>
      </form>
    </Form>
  );
}
