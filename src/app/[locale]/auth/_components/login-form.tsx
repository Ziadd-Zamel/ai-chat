"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { useLoginSchema, LoginFields } from "@/lib/schemas/auth.schema";
import { PasswordInput } from "./password-input";
import { useLogin } from "../_hooks/use-auth";

export default function LoginForm() {
  // Translations
  const t = useTranslations("auth");

  const { login, isPending } = useLogin();

  // Schema & form setup with validation
  const schema = useLoginSchema();
  const form = useForm<LoginFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handles form submission for user login
  function onSubmit(values: LoginFields) {
    login(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md  py-5"
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
                  autoComplete="current-password"
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

        {/* Form actions & links */}
        <div className="flex flex-col w-full items-end">
          <Link
            className="underline -mt-5 sm:text-sm text-xs text-[#0D8840]"
            href="/auth/password/forget"
          >
            {t("forgot-password")}
          </Link>
          <Button
            type="submit"
            variant="default"
            className="w-full h-9 sm:h-12 mt-5"
          >
            {t("login-submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
