import { IPrimaryButton } from "../utils/types";

export const PrimaryButton = ({
  text = "Submit",
  onClick,
  extraContainerClassNames,
  extraButtonClassNames,
  disabled,
  children,
}: IPrimaryButton) => {
  return (
    <div
      className={`cursor-pointer disabled:cursor-not-allowed transition transition-duration-100 ${
        disabled
          ? ""
          : "hover:bg-[color:var(--color-text-secondary)] hover:text-[color:var(--color-bg-secondary)]"
      } rounded-md shadow-md ${extraContainerClassNames}`}
    >
      <button
        className={`cursor-pointer text-sm font-bold p-2 border disabled:cursor-not-allowed disabled:bg-[color:var(--color-bg-surface)]/50 border-[color:var(--color-border)] rounded-sm ${extraButtonClassNames}`}
        onClick={(e) => onClick(e)}
        disabled={disabled}
      >
        {children || text}
      </button>
    </div>
  );
};
