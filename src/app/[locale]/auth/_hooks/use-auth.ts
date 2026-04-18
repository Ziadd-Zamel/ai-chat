"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  forgotPasswordService,
  loginService,
  registerService,
  resetPasswordService,
  verifyCodeService,
} from "@/lib/services/auth.service";
import {
  ForgotPasswordFields,
  LoginFields,
  ResetPasswordFields,
  SignupFields,
  VerifyCodeFields,
} from "@/lib/schemas/auth.schema";
import { useRouter } from "@/i18n/navigation";
import { signIn } from "@/auth";

// Register hook
export function useRegister() {
  // Translation
  const t = useTranslations("auth");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: register } = useMutation({
    mutationFn: async (params: SignupFields) => {
      // Create form data
      const formData = new FormData();
      formData.append("fullName", params.name);
      formData.append("email", params.email);
      formData.append("password", String(params.password));

      // Call service
      const result = await registerService(formData);
      console.log(result);
      // Throw on error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("register-success"));
      router.push("/verify");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { register, isPending };
}

// Login hook
export function useLogin() {
  // Translation
  const t = useTranslations("auth");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: login } = useMutation({
    mutationFn: async (params: LoginFields) => {
      // Call NextAuth signIn with credentials
      const result = await signIn("credentials", {
        email: params.email,
        password: params.password,
        redirect: false,
      });

      // Throw error if sign in failed
      if (result?.error) {
        throw new Error(t("login-invalid-credentials"));
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

  return { login, isPending };
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
      // New form data
      const formData = new FormData();

      // Create form data
      formData.append("email", params.email);

      // Result
      const result = await forgotPasswordService(formData);

      // Throw error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("forgot-password-success"));
      router.push("/auth/forget-password/verify");
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
      // New form data
      const formData = new FormData();

      // Create form data
      formData.append("code", params.code);
      formData.append("email", "email");

      // Result
      const result = await verifyCodeService(formData);

      // Throw error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("verify-code-success"));
      router.push("/auth/reset-password");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { verifyCode, isPending };
}

// Reset password hook
export function useResetPassword() {
  // Translation
  const t = useTranslations("auth");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: async (params: ResetPasswordFields) => {
      // New form data
      const formData = new FormData();

      // Create form data
      formData.append("password", String(params.password));
      formData.append("confirmPassword", String(params.confirmPassword));
      formData.append("email", String(params.password));
      formData.append("resetToken", String(params.confirmPassword));

      // Result
      const result = await resetPasswordService(formData);

      // Throw error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("reset-password-success"));
      router.push("/auth/login");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { resetPassword, isPending };
}
