import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSignupSchema = () => {
  const t = useTranslations("auth");

  return z
    .object({
      name: z
        .string()
        .min(1, { message: t("name-required") })
        .min(2, { message: t("name-min-length") }),

      email: z
        .string()
        .min(1, { message: t("email-required") })
        .email({ message: t("email-invalid") }),

      password: z
        .string()
        .min(1, { message: t("password-required") })
        .min(8, { message: t("password-min-length") }),

      confirmPassword: z
        .string()
        .min(1, { message: t("confirm-password-required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-do-not-match"),
      path: ["confirmPassword"],
    });
};

export type SignupFields = z.infer<ReturnType<typeof useSignupSchema>>;

// Login
export const useLoginSchema = () => {
  const t = useTranslations("auth");

  return z.object({
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),

    password: z.string().min(1, { message: t("password-required") }),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;

// Forgot password
export const useForgotPasswordSchema = () => {
  const t = useTranslations("auth");

  return z.object({
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),
  });
};

export type ForgotPasswordFields = z.infer<
  ReturnType<typeof useForgotPasswordSchema>
>;

// Verify code (6-digit OTP)
export const useVerifyCodeSchema = () => {
  const t = useTranslations("auth");

  return z.object({
    code: z
      .string()
      .min(1, { message: t("code-required") })
      .length(6, { message: t("code-length") })
      .regex(/^\d{6}$/, { message: t("code-digits-only") }),
  });
};

export type VerifyCodeFields = z.infer<ReturnType<typeof useVerifyCodeSchema>>;

// Reset password
export const useResetPasswordSchema = () => {
  const t = useTranslations("auth");

  return z
    .object({
      password: z
        .string()
        .min(1, { message: t("password-required") })
        .min(8, { message: t("password-min-length") }),

      confirmPassword: z
        .string()
        .min(1, { message: t("confirm-password-required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-do-not-match"),
      path: ["confirmPassword"],
    });
};

export type ResetPasswordFields = z.infer<
  ReturnType<typeof useResetPasswordSchema>
>;
