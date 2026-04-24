"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import Image from "next/image";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  isCreating?: boolean;
}

export default function ChatInput({
  onSend,
  disabled,
  isCreating,
}: ChatInputProps) {
  const t = useTranslations("chat");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const content = input.trim();
    if (!content || disabled || isCreating) return;

    setInput("");
    onSend(content);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = !!input.trim() && !disabled && !isCreating;

  return (
    <div className="shrink-0 bg-[#0B0F0D] pb-6">
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        {/* Input box */}
        <div className="flex h-12 flex-1 items-center rounded-2xl border border-[#1B221F] bg-[#0E1311] px-5">
          <input
            ref={inputRef}
            dir="rtl"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isCreating}
            placeholder={t("inputPlaceholder")}
            className="w-full bg-transparent text-right text-sm text-[#E8EDE9] outline-none placeholder:text-[#6F7873] disabled:opacity-50"
          />
        </div>
        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className="relative size-15 cursor-pointer shrink-0 transition-transform duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image
            src="/assets/Icons/button-bg.svg"
            alt="backgrounde image"
            fill
            className="absolute inset-0 h-full w-full object-contain"
          />

          <span className="relative z-20 flex h-full w-full items-center justify-center">
            {isCreating ? (
              <span
                className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                style={{ animation: "spin 0.8s linear infinite" }}
              />
            ) : (
              <Send
                size={18}
                className={canSend ? "text-white" : "text-[#526158]"}
              />
            )}
          </span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
