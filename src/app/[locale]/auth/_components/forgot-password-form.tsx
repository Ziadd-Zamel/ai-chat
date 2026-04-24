"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useForgotPasswordSchema,
  ForgotPasswordFields,
} from "@/lib/schemas/auth.schema";
import { useForgotPassword } from "../_hooks/use-auth";

export default function ForgotPasswordForm() {
  // Translations
  const t = useTranslations("auth");

  const { forgotPassword, isPending } = useForgotPassword();

  // Schema & form setup with validation
  const schema = useForgotPasswordSchema();
  const form = useForm<ForgotPasswordFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  // Handles form submission to send password recovery email
  function onSubmit(values: ForgotPasswordFields) {
    forgotPassword(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md py-5"
      >
        {/* Email Input field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("email-label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("email-placeholder")}
                  autoComplete="email"
                  className={cn(
                    fieldState.error && "border-red-500 focus:border-none",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="default"
          disabled={isPending}
          className="w-full h-9 sm:h-12 mt-5"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("sending")}
            </span>
          ) : (
            t("forgot-password-submit")
          )}
        </Button>
      </form>
    </Form>
  );
}
