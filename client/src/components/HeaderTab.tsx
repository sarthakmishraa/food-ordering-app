import { IHeaderTab } from "../utils/types";

export const HeaderTab = ({
  tabTitle,
  onClick,
  isActiveTab,
  specialTab,
}: IHeaderTab) => {
  return (
    <div
      className={`${
        isActiveTab && "underline"
      } cursor-pointer hover:text-[color:var(--color-text-secondary)] transition duration-100
      ${
        specialTab
          ? "text-[color:var(--color-bg-primary)] bg-[var(--color-text-primary)] px-1 rounded text-md font-semibold"
          : "text-[var(--color-text-primary)] text-md font-bold"
      }`}
      onClick={(e) => onClick(e)}
    >
      {tabTitle}
    </div>
  );
};
