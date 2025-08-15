import React from "react";
import { SomethingWentWrongProps } from "../utils/types";

export const SomethingWentWrong: React.FC<
  SomethingWentWrongProps
> = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}) => {
  return (
    <div className="h-full w-full min-h-[480px] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Oops!
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
