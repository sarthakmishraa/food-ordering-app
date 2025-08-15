import { IPrimaryButton } from "../utils/types";

export const PrimaryButton = ({
  text = "Submit",
  onClick,
  extraContainerClassNames,
  extraButtonClassNames,
  disabled,
}: IPrimaryButton) => {
  return (
    <div
      className={`${extraContainerClassNames} cursor-pointer disabled:cursor-not-allowed`}
    >
      <button
        className={`${extraButtonClassNames} cursor-pointer text-sm p-2 border border-red-200 rounded-sm`}
        onClick={(e) => onClick(e)}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};
