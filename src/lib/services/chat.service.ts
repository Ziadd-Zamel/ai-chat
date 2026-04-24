// Create a new chat — title is optional, token is optional (public endpoint)
export async function createChatService({
  title,
  token,
}: {
  title?: string;
  token?: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chats`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ title }),
  });
  console.log("tokentokentoken", token);
  console.log("tokentokentoken", response);
  const result = await response.json();
  console.log("tokentokentoken", result);

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/chats/send`,
    {
      method: "POST",
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

  // Read the SSE stream
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

    // Each SSE line looks like: data: {...}
    const lines = raw.split("\n").filter((l) => l.startsWith("data: "));

    for (const line of lines) {
      try {
        const json = JSON.parse(line.slice(6)); // strip "data: "

        if (json.type === "chunk") {
          fullText += json.text;
          onChunk?.(json.text); // stream chunk to UI in real-time
        }

        if (json.type === "done") {
          return {
            status: true,
            result: { message: fullText },
          };
        }
      } catch {
        // malformed line, skip
      }
    }
  }

  return { status: true, result: { message: fullText } };
}
