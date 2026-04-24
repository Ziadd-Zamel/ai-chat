import {
  createChatService,
  sendChatMessageService,
} from "@/lib/services/chat.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useCreateChat() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();

  const { isPending, mutate: createChat } = useMutation({
    mutationFn: async ({ title }: { title?: string }) => {
      const result = await createChatService({ title, token });
      if (!result.status) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { createChat, isPending };
}

export function useSendChatMessage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const sendMessage = async ({
    chatId,
    text,
    name,
    onChunk,
  }: {
    chatId: string;
    text: string;
    name?: string;
    onChunk?: (chunk: string) => void;
  }) => {
    const result = await sendChatMessageService({
      chatId,
      text,
      name,
      token,
      onChunk,
    });
    if (!result.status) throw new Error(result.message);
    return result;
  };

  return { sendMessage };
}
