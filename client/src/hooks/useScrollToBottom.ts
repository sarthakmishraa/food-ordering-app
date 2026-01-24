import { useEffect } from "react";
import { Message } from "../utils/types";

export const useScrollToBottom = (
  bottomRef: React.RefObject<HTMLDivElement>,
  messages: Message[] | undefined
) => {
  useEffect(() => {
    if (!!messages) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, bottomRef]);
};
