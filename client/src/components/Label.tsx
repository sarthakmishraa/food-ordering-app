import React from "react";
import { LabelProps } from "../utils/types";

export const Label: React.FC<LabelProps> = ({
  text,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`text-2xl font-bold ${className}`}
    >
      {text}
    </div>
  );
};
