"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import {
  CreateBookingAppInput,
  CreateQnAAppInput,
} from "../schemas/app.schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ── appType 1: QnA App ──────────────────────────────────────────
export async function createQnAAppService(data: CreateQnAAppInput) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const response = await fetch(`${BASE_URL}/apps`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      status: false,
      message: result?.message ?? "Something went wrong",
      result: null,
    };
  }

  return { status: true, message: result?.message, result };
}

// ── appType 2: Booking App ──────────────────────────────────────
export async function createBookingAppService(data: CreateBookingAppInput) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const response = await fetch(`${BASE_URL}/apps`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      status: false,
      message: result?.message ?? "Something went wrong",
      result: null,
    };
  }

  return { status: true, message: result?.message, result };
}
