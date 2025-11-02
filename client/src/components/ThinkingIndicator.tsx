import React from "react";

export const ThinkingIndicator: React.FC<{
  showThreeDots?: boolean;
}> = ({ showThreeDots = true }) => {
  return (
    <div className="w-fit flex items-center space-x-2 p-2 rounded-lg bg-[color:var(--color-bg-secondary)]/60 backdrop-blur-sm animate-pulse select-none">
      <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
        Generating
      </div>

      {showThreeDots && (
        <div className="flex space-x-1">
          <span className="w-1.5 h-1.5 bg-[color:var(--color-text-primary)] rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 bg-[color:var(--color-text-primary)] rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 bg-[color:var(--color-text-primary)] rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      )}
    </div>
  );
};
