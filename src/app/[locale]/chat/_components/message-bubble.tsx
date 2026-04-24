import { cn } from "@/lib/utils";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full")}>
      <div
        className={cn(
          "max-w-[72%] px-4 py-2.5 text-[14px] leading-relaxed text-[#E8EDE9] bg-[#161918] border border-[#232826] rounded-[4px_14px_14px_14px]",
          isUser
            ? "bg-[#1C1F1E] border border-[#2a2f2d] rounded-[14px_4px_14px_14px]"
            : "",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
