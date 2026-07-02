import { BiCopy, BiCheck } from "react-icons/bi";
import { Message } from "../utils/types";
import { useState } from "react";

const CopyButton = ({
  onClick,
}: {
  onClick?: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    onClick?.();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className="p-1 rounded hover:bg-[color:var(--color-text-primary)] hover:text-[color:var(--color-bg-primary)] duration-300 cursor-pointer"
      title="Copy"
      onClick={handleCopyClick}
    >
      {copied ? <BiCheck /> : <BiCopy />}
    </div>
  );
};

export const FeedbackActions = ({
  message,
}: {
  message?: Message;
}) => {
  const copyToClipboard = async () => {
    const content = message?.data?.content;
    try {
      if (content) {
        await navigator.clipboard.writeText(content);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="flex">
      <CopyButton onClick={copyToClipboard} />
    </div>
  );
};
