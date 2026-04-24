export async function createChatService({
  title,
  token,
}: {
  title?: string;
  token?: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chats`, {
    method: "POST",
    credentials: "include", // ← ADD THIS so the pg_guest cookie is stored on creation
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ title }),
  });

  const result = await response.json();

  if (!response.ok) {
    return { status: false, success: false, message: result?.message };
  }

  return { status: true, message: result?.message, result };
}

export async function sendChatMessageService({
  chatId,
  text,
  name,
  token,
  onChunk,
}: {
  chatId: string;
  text: string;
  name?: string;
  token?: string;
  onChunk?: (chunk: string) => void;
}) {
  // ← REMOVED unused guestToken dead code

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/chats/send`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ chatId, text, name }),
    },
  );

  if (!response.ok) {
    const result = await response.json();
    return { status: false, success: false, message: result?.message };
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  if (!reader) {
    return { status: false, message: "No response body" };
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const raw = decoder.decode(value, { stream: true });
    const lines = raw.split("\n").filter((l) => l.startsWith("data: "));

    for (const line of lines) {
      try {
        const json = JSON.parse(line.slice(6));

        if (json.type === "chunk") {
          fullText += json.text;
          onChunk?.(json.text);
        }

        if (json.type === "done") {
          return { status: true, result: { message: fullText } };
        }
      } catch {
        // malformed line, skip
      }
    }
  }

  return { status: true, result: { message: fullText } };
}
