import React from "react";

type LoaderProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  size = 32,
  color = "var(--color-accent)",
  className = "",
}) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-transparent border-t-current ${className}`}
      style={{
        width: size,
        height: size,
        color,
      }}
      role="status"
    />
  );
};
