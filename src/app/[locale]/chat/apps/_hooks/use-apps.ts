"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import {
  CreateBookingAppInput,
  CreateQnAAppInput,
} from "@/lib/schemas/app.schema";
import {
  createBookingAppService,
  createQnAAppService,
} from "@/lib/services/app.service";

// Create QnA app hook
export function useCreateQnAApp() {
  // Translation
  const t = useTranslations("apps");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: createQnAApp } = useMutation({
    mutationFn: async (params: CreateQnAAppInput) => {
      // Call service
      const result = await createQnAAppService(params);

      // Throw on error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("create-qna-app-success"));
      router.push("/dashboard/apps");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { createQnAApp, isPending };
}

// Create booking app hook
export function useCreateBookingApp() {
  // Translation
  const t = useTranslations("apps");

  // Router hook
  const router = useRouter();

  // Mutation
  const { isPending, mutate: createBookingApp } = useMutation({
    mutationFn: async (params: CreateBookingAppInput) => {
      // Call service
      const result = await createBookingAppService(params);

      // Throw on error
      if (!result.status) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: () => {
      toast.success(t("create-booking-app-success"));
      router.push("/dashboard/apps");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { createBookingApp, isPending };
}
