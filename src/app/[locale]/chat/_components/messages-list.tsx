"use client";

import { useEffect, useRef } from "react";
import { Message } from "./types";
import MessageBubble from "./message-bubble";
import TypingIndicator from "./typing-Indicator";

interface MessagesListProps {
  messages: Message[];
  isTyping: boolean;
  isLoading?: boolean;
}

// Skeleton for a single message bubble while loading
function MessageSkeleton({ align }: { align: "start" | "end" }) {
  return (
    <div
      className={`flex w-full ${align === "end" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`h-9 rounded-2xl animate-pulse bg-[#1C1F1E] ${
          align === "end" ? "w-40" : "w-56"
        }`}
      />
    </div>
  );
}

// Alternating skeleton pattern that mimics a real conversation
function MessagesListSkeleton() {
  const pattern: Array<{ align: "start" | "end"; opacity: number }> = [
    { align: "end", opacity: 1 },
    { align: "start", opacity: 0.85 },
    { align: "end", opacity: 0.7 },
    { align: "start", opacity: 0.55 },
    { align: "start", opacity: 0.4 },
  ];

  return (
    <div className="flex flex-col gap-5">
      {pattern.map((item, i) => (
        <div key={i} style={{ opacity: item.opacity }}>
          <MessageSkeleton align={item.align} />
        </div>
      ))}
    </div>
  );
}

export default function MessagesList({
  messages,
  isTyping,
  isLoading,
}: MessagesListProps) {
  // Auto-scroll to bottom whenever messages change or typing starts/stops
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="flex flex-col gap-5 max-w-2xl w-full mx-auto">
        {/* Skeleton while fetching existing messages */}
        {isLoading ? (
          <MessagesListSkeleton />
        ) : (
          <>
            {/* Render each message bubble */}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator while waiting for AI reply */}
            {isTyping && <TypingIndicator />}
          </>
        )}

        {/* Invisible anchor to scroll into view */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
