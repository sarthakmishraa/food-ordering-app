import React from "react";
import { MessageRole } from "../utils/constants";
import { Message } from "../utils/types";

export const MessageBubble: React.FC<{
  key: string | number;
  message: Message;
}> = ({ key, message }) => {
  return (
    <div
      className={`flex flex-col justify-between ${
        message?.role === MessageRole.USER
          ? "items-end"
          : message?.role === MessageRole.BOT
          ? "items-start"
          : ""
      }`}
      key={key}
    >
      <div
        className={`p-1 text-sm ${
          message?.role === MessageRole.USER
            ? "border border-solid border-[color:var(--color-border)] rounded-lg shadow-lg text-[color:var(--color-bg-primary)] bg-[color:var(--color-text-primary)]"
            : message?.role === MessageRole.BOT
            ? "text-[color:var(--color-text-primary)]"
            : ""
        }`}
      >
        {message?.data?.content}
      </div>
    </div>
  );
};
