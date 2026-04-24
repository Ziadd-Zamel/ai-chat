import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    const resolvedParams = await params;
    const response = await fetch(
      `${process.env.Basic_URL}/chats/${resolvedParams.chatId}/messages`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: result.message, success: false, status: result.status },
        { status: response.status },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat messages fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}
