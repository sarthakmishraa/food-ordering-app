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
      className={`${extraContainerClassNames} cursor-pointer disabled:cursor-not-allowed transition transition-duration-100 hover:bg-[color:var(--color-bg-surface)] hover:text-[color:var(--color-bg-secondary)] rounded-md shadow-md`}
    >
      <button
        className={`${extraButtonClassNames} cursor-pointer text-md font-bold p-2 border border-[color:var(--color-border)] rounded-sm`}
        onClick={(e) => onClick(e)}
        disabled={disabled}
      >
        {children || text}
      </button>
    </div>
  );
};
