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
import { PasswordInput } from "./password-input";
import { useSignupSchema, SignupFields } from "@/lib/schemas/auth.schema";
import { useRegister } from "../_hooks/use-auth";

export default function RegisterForm() {
  // Translations
  const t = useTranslations("auth");

  // Register Hook
  const { register, isPending } = useRegister();

  // Schema & form setup with validation
  const schema = useSignupSchema();
  const form = useForm<SignupFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handles form submission for user registration
  function onSubmit(values: SignupFields) {
    register(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md py-5"
      >
        {/* Name Input field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("name-label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("name-placeholder")}
                  autoComplete="name"
                  className={cn(
                    fieldState.error && "border-red-500 focus:border-none",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Password Input field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("password-label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="new-password"
                  placeholder={t("password-placeholder")}
                  className={cn(
                    fieldState.error && "border-red-500 focus:border-none",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Input field */}
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
          disabled={isPending}
          className="w-full h-9 sm:h-12 mt-5"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("signing-up")}
            </span>
          ) : (
            t("signup-submit")
          )}
        </Button>
      </form>
    </Form>
  );
}
