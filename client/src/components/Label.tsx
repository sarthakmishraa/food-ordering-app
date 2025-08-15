import React from "react";
import { LabelProps } from "../utils/types";

export const Label: React.FC<LabelProps> = ({
  text,
  className = "",
}) => {
  return (
    <div className={`text-xl font-medium ${className}`}>
      {text}
    </div>
  );
};
