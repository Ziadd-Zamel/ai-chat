import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const response = await fetch(`${process.env.Basic_URL}/chats`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: result.message, success: false, status: result.status },
        { status: response.status },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chats fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}
