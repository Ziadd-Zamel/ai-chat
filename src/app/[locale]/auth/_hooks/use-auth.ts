"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  forgotPasswordService,
  registerService,
  resetPasswordService,
  verifyCodeService,
  verifyPasswordCodeService,
} from "@/lib/services/auth.service";
import {
  ForgotPasswordFields,
  LoginFields,
  ResetPasswordFields,
  SignupFields,
  VerifyCodeFields,
} from "@/lib/schemas/auth.schema";
import { useRouter } from "@/i18n/navigation";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

// Register hook
export function useRegister() {
  // Translation
  const t = useTranslations("auth");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: register } = useMutation({
    mutationFn: async (params: SignupFields) => {
      // Call service
      const result = await registerService(params);

      // Throw on error
      if (!result.status) {
        throw new Error(result.message);
      }

      // save email at cookies
      Cookies.set("pending_verification_email", params.email, {
        expires: 1 / (24 * 12),
        secure: true,
        sameSite: "strict",
      });

      return result;
    },

    onSuccess: () => {
      toast.success(t("register-success"));
      router.push("/auth/verify");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { register, isPending };
}

// Login hook
export function useLogin() {
  const t = useTranslations("auth");
  const router = useRouter();

  const { isPending, mutate: login } = useMutation({
    mutationFn: async (params: LoginFields) => {
      const result = await signIn("credentials", {
        email: params.email,
        password: params.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        throw new Error(t("login-invalid-credentials"));
      }

      if (!result?.ok) {
        throw new Error(t("login-failed"));
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("login-success"));
      router.push("/");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isPending, login };
}
// Forgot password hook
export function useForgotPassword() {
  // Translation
  const t = useTranslations("auth");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: forgotPassword } = useMutation({
    mutationFn: async (params: ForgotPasswordFields) => {
      // Result
      const result = await forgotPasswordService(params.email);

      // Throw error
      if (!result.status) {
        throw new Error(result.message);
      }

      // save email at cookies
      Cookies.set("pending_verification_email", params.email, {
        expires: 1 / (24 * 12),
        secure: true,
        sameSite: "strict",
      });

      return result;
    },

    onSuccess: () => {
      toast.success(t("forgot-password-success"));
      router.push("/auth/verify?type=none");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { forgotPassword, isPending };
}

// Verify code hook
export function useVerifyCode() {
  // Translation
  const t = useTranslations("auth");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: verifyCode } = useMutation({
    mutationFn: async (params: VerifyCodeFields) => {
      // Get email
      const email = Cookies.get("pending_verification_email");

      // Result
      const result = await verifyCodeService({
        code: params.code,
        email: email || "",
      });

      // Throw error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("verify-code-success"));
      Cookies.remove("pending_verification_email");
      router.push("/auth/login");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { verifyCode, isPending };
}
// Verify code hook
export function useVerifyPasswordCode() {
  const t = useTranslations("auth");
  const router = useRouter();

  const { isPending, mutate: verifyCode } = useMutation({
    mutationFn: async (params: VerifyCodeFields) => {
      const email = Cookies.get("pending_verification_email");

      const result = await verifyPasswordCodeService({
        code: params.code,
        email: email || "",
      });

      if (!result.status) {
        throw new Error(result.message);
      }

      Cookies.set("pending_verification_email", email || "", {
        expires: 1 / (24 * 12),
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("reset_token", result.result.resetToken, {
        expires: 1 / (24 * 12),
        secure: true,
        sameSite: "strict",
      });

      return result;
    },

    onSuccess: () => {
      toast.success(t("verify-code-success"));
      router.push("/auth/password/reset");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { verifyCode, isPending };
}

export function useResetPassword() {
  const t = useTranslations("auth");
  const router = useRouter();

  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: async (params: ResetPasswordFields) => {
      const email = Cookies.get("pending_verification_email") || "";
      const resetToken = Cookies.get("reset_token") || "";

      const result = await resetPasswordService({
        email,
        resetToken,
        newPassword: params.password,
        confirmPassword: params.confirmPassword,
      });

      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      Cookies.remove("pending_verification_email");
      Cookies.remove("reset_token");

      toast.success(t("reset-password-success"));
      router.push("/auth/login");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { resetPassword, isPending };
}
