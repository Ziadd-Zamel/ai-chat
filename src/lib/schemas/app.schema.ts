import { useTranslations } from "next-intl";
import { z } from "zod";

// ── appType 1: QnA App ──────────────────────────────────────────
export const useCreateQnAAppSchema = () => {
  const t = useTranslations("apps");

  return z.object({
    name: z.string().min(1, { message: t("name-required") }),
    appType: z.literal(1),
    commonFallbackAnswer: z
      .string()
      .min(1, { message: t("fallback-answer-required") }),
    qaPairs: z
      .array(
        z.object({
          question: z.string().min(1, { message: t("question-required") }),
          answer: z.string().min(1, { message: t("answer-required") }),
        }),
      )
      .min(1, { message: t("qa-pairs-required") }),
    apiKeyExpiryDays: z
      .number({ message: t("expiry-days-required") })
      .int()
      .positive({ message: t("expiry-days-positive") }),
  });
};

export type CreateQnAAppInput = z.infer<
  ReturnType<typeof useCreateQnAAppSchema>
>;

// ── appType 2: Booking App ──────────────────────────────────────
export const reservationRequiredFieldValues = [
  "date",
  "time",
  "participantCount",
  "name",
  "phone",
] as const;

export const useCreateBookingAppSchema = () => {
  const t = useTranslations("apps");

  return z.object({
    name: z.string().min(1, { message: t("name-required") }),
    appType: z.literal(2),
    reservationRulesText: z
      .string()
      .min(1, { message: t("reservation-rules-required") }),
    reservationRequiredFields: z
      .array(z.enum(reservationRequiredFieldValues))
      .min(1, { message: t("reservation-fields-required") }),
    apiKeyExpiryDays: z
      .number({ message: t("expiry-days-required") })
      .int()
      .positive({ message: t("expiry-days-positive") }),
  });
};

export type CreateBookingAppInput = z.infer<
  ReturnType<typeof useCreateBookingAppSchema>
>;
