import React from "react";
import { MessageRole } from "../utils/constants";
import { Message } from "../utils/types";
import { RichTextRenderer } from "./RichTextRenderer";
import { FeedbackActions } from "./FeedbackActions";
import { useStreamMessage } from "../slices/askGustoSlice";
import { useAppSelector } from "../store/hooks";

export const MessageBubble: React.FC<{
  message: Message;
}> = ({ message }) => {
  const isUser = message?.role === MessageRole.USER;
  const isBot = message?.role === MessageRole.BOT;

  const streamingMessage = useAppSelector(useStreamMessage);

  const isStreaming = streamingMessage?.isStreaming;
  const showFeedbackActions = !isStreaming;

  return (
    <div
      className={`flex flex-col justify-between ${
        isUser ? "items-end" : isBot ? "items-start" : ""
      }`}
    >
      <div
        className={`p-2 text-md ${
          isUser
            ? "border border-solid border-[color:var(--color-border)] rounded-lg shadow-lg text-[color:var(--color-bg-primary)] bg-[color:var(--color-text-primary)]"
            : isBot
            ? "text-[color:var(--color-text-primary)] w-full"
            : ""
        }`}
      >
        {isUser ? (
          <>{message?.data?.content}</>
        ) : isBot ? (
          <div className="flex flex-col gap-4">
            <RichTextRenderer
              content={message?.data?.content}
            />
            {showFeedbackActions && (
              <FeedbackActions message={message} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
