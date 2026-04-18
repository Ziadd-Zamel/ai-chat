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
import { PasswordInput } from "./password-input";
import {
  useResetPasswordSchema,
  ResetPasswordFields,
} from "@/lib/schemas/auth.schema";
import { useResetPassword } from "../_hooks/use-auth";

export default function ResetPasswordForm() {
  // Translations
  const t = useTranslations("auth");

  // Register Hook
  const { resetPassword, isPending } = useResetPassword();

  // Schema & form setup with validation
  const schema = useResetPasswordSchema();
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handles form submission to reset the user's password
  function onSubmit(values: ResetPasswordFields) {
    resetPassword(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md py-5"
      >
        {/* New Password Input field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("new-password-label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="new-password"
                  placeholder={t("new-password-placeholder")}
                  className={cn(
                    fieldState.error && "border-red-500 focus:border-none",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm New Password Input field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("confirm-password-label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="new-password"
                  placeholder={t("confirm-password-placeholder")}
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
          className="w-full h-9 sm:h-12 mt-5"
        >
          {t("reset-password-submit")}
        </Button>
      </form>
    </Form>
  );
}
