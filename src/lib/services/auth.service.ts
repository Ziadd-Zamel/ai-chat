"use server";

// Register service
export async function registerService(formData: FormData) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });

  // Result
  console.log("responseresponse", response);
  const result = await response.json();
  console.log(result);
  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return result;
}

// Login service
export async function loginService(formData: FormData) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/login`, {
    method: "POST",
    body: formData,
  });

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return result;
}

// Forgot password service
export async function forgotPasswordService(formData: FormData) {
  // Response
  const response = await fetch(
    `${process.env.Basic_URL}/auth/forgot-password`,
    {
      method: "POST",
      body: formData,
    },
  );

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return result;
}

// Verify code service
export async function verifyCodeService(formData: FormData) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/verify-email`, {
    method: "POST",
    body: formData,
  });

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return result;
}

// Reset password service
export async function resetPasswordService(formData: FormData) {
  // Response
  const response = await fetch(`${process.env.Basic_URL}/auth/reset-password`, {
    method: "POST",
    body: formData,
  });

  // Result
  const result = await response.json();

  // Return error
  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return result;
}
