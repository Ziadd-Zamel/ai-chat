"use server";

import { SignupFields } from "../schemas/auth.schema";

// Register service
export async function registerService(body: SignupFields) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: body.name,
      email: body.email,
      password: body.password,
    }),
  });

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return { status: true, message: result?.message };
}

// Login service
export async function loginService({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  // Result
  const result = await response.json();

  // Return
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return { status: true, message: result?.message, result: result };
}

// Forgot password service
export async function forgotPasswordService(email: string) {
  // Response
  const response = await fetch(
    `${process.env.Basic_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    },
  );

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return { status: true, message: result?.message, result: result };
}

// Verify code service
export async function verifyCodeService({
  code,
  email,
}: {
  code: string;
  email: string;
}) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      code: code,
    }),
  });

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return { status: true, message: result?.message };
}

export async function verifyPasswordCodeService({
  code,
  email,
}: {
  code: string;
  email: string;
}) {
  // Response
  const response = await fetch(
    `${process.env.Basic_URL}/auth/verify-reset-code`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    },
  );

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return { status: true, message: result?.message, result: result };
}

// Reset password service
interface ResetPasswordParams {
  email: string;
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export async function resetPasswordService({
  email,
  resetToken,
  newPassword,
  confirmPassword,
}: ResetPasswordParams) {
  const response = await fetch(`${process.env.Basic_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      resetToken,
      newPassword,
      confirmPassword,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    return { status: false, message: result?.message };
  }

  return { status: true, message: result?.message };
}
