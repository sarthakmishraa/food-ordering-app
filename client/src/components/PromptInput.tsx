import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

export const PromptInput: React.FC<{
  containerClassName?: string;
  value?: string;
  onSubmit: (prompt: string) => void;
  placeholder?: string;
}> = ({
  containerClassName,
  value,
  onSubmit,
  placeholder = "Ask Gusto",
}) => {
  const [prompt, setPrompt] = useState<string>(value || "");
  const onChange = (prompt: string) => {
    setPrompt(prompt);
  };

  const handleSubmit = () => {
    setPrompt("");
    onSubmit(prompt);
  };

  return (
    <div
      className={`bg-[color:var(--color-bg-primary)] border-1 border-solid border-[color:var(--color-text-secondary)] rounded-3xl p-2 shadow-2xl shadow-[color:var(--color-text-primary)] w-sm lg:w-lg xl:w-2xl ${containerClassName}`}
    >
      <textarea
        placeholder={placeholder}
        className="resize-none p-1 w-full min-h-12 max-h-64 text-sm text-[color:var(--color-text-primary)] border-none outline-none"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        value={prompt}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        autoFocus
      />
      <div
        className="flex justify-end cursor-pointer"
        onClick={handleSubmit}
      >
        <div className="p-2 rounded-xl duration-150 hover:bg-[color:var(--color-text-secondary)]/50">
          <IoSend size={18} />
        </div>
      </div>
    </div>
  );
};
