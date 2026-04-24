"use client";

import { useState, useEffect, useRef } from "react";
import { useQueryState } from "nuqs";
import MessagesList from "./messages-list";
import WelcomeState from "./welcome-state";
import ChatInput from "./chat-input";
import { Message } from "./types";
import {
  useCreateChat,
  useSendChatMessage,
} from "../../auth/_hooks/creat-chat-hooks";
import { useChatMessages } from "../_hooks/use-chats";
import { toast } from "sonner";

const DEFAULT_AI_MESSAGE: Message = {
  id: "default-ai-msg",
  role: "assistant",
  content: "مرحباً! أنا هنا لمساعدتك. كيف يمكنني مساعدتك اليوم؟ 😊",
};

export default function ChatPage() {
  const [chatId, setChatId] = useQueryState("chatId");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const isSendingRef = useRef(false);
  const skipSyncRef = useRef(false);

  const { createChat, isPending: isCreating } = useCreateChat();
  const { sendMessage } = useSendChatMessage();

  const { data: existingMessages, isLoading: isLoadingMessages } =
    useChatMessages(chatId ?? "");

  useEffect(() => {
    if (skipSyncRef.current) return;

    if (!chatId) {
      setMessages([]);
      return;
    }

    if (existingMessages) {
      setMessages([
        DEFAULT_AI_MESSAGE,
        ...existingMessages.map((msg) => ({
          id: String(msg.id),
          role: msg.role,
          content: msg.content,
        })),
      ]);
    }
  }, [chatId, existingMessages]);

  const sendToChat = async (activeChatId: string, content: string) => {
    setIsTyping(true);
    const aiMsgId = `ai-${Date.now()}`;
    let firstChunk = true;

    try {
      await sendMessage({
        chatId: activeChatId,
        text: content,
        onChunk: (chunk: string) => {
          if (firstChunk) {
            firstChunk = false;
            setMessages((prev) => [
              ...prev,
              { id: aiMsgId, role: "assistant", content: chunk },
            ]);
          } else {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiMsgId ? { ...m, content: m.content + chunk } : m,
              ),
            );
          }
          setIsTyping(false);
        },
      });
    } catch {
      toast.error("Failed to send message");
      setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
    } finally {
      setIsTyping(false);
      isSendingRef.current = false;
      // Now allow useEffect to sync if needed
      skipSyncRef.current = false;
    }
  };

  const handleSend = async (content: string) => {
    if (isSendingRef.current) return;
    isSendingRef.current = true;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    if (chatId) {
      // Chat exists — just append and send
      setMessages((prev) => [...prev, userMsg]);
      await sendToChat(chatId, content);
      return;
    }

    // No chat yet — block sync, set optimistic messages, create chat, then send
    skipSyncRef.current = true;
    setMessages([DEFAULT_AI_MESSAGE, userMsg]);

    createChat(
      {},
      {
        onSuccess: async (data) => {
          const newChatId = data.result?.id;
          if (!newChatId) {
            isSendingRef.current = false;
            skipSyncRef.current = false;
            return;
          }
          await setChatId(newChatId);
          await sendToChat(newChatId, content);
        },
        onError: () => {
          isSendingRef.current = false;
          skipSyncRef.current = false;
          setMessages([]);
        },
      },
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0D0F0E] overflow-hidden">
      {chatId ? (
        <MessagesList
          messages={messages}
          isTyping={isTyping}
          isLoading={isLoadingMessages && !isSendingRef.current}
        />
      ) : (
        <WelcomeState />
      )}

      <ChatInput
        onSend={handleSend}
        disabled={isTyping || isLoadingMessages}
        isCreating={isCreating}
      />
    </div>
  );
}
