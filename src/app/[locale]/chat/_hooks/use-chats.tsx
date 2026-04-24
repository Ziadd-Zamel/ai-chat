import { useQuery } from "@tanstack/react-query";

//  Types

export interface Chat {
  id: string;
  title: string;
  conversationUrl: string | null;
  createdAt: string;
}

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  status: string;
  createdAt: string;
}

// Fetchers

export const getChats = async (): Promise<Chat[]> => {
  const response = await fetch("/api/chats", { method: "GET" });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
  const response = await fetch(`/api/chats/${chatId}/messages`, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

// Hooks

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    staleTime: 5 * 60 * 1000,
  });
}

export function useChatMessages(chatId: string) {
  return useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId,
    staleTime: 5 * 60 * 1000,
  });
}
