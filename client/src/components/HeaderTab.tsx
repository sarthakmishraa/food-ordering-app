import { IHeaderTab } from "../utils/types";

export const HeaderTab = ({
  tabTitle,
  onClick,
  isActiveTab,
}: IHeaderTab) => {
  return (
    <div
      className={`${
        isActiveTab && "underline"
      } cursor-pointer text-[var(--color-text-primary)] hover:text-[color:var(--color-text-secondary)] text-md font-bold transition duration-100`}
      onClick={(e) => onClick(e)}
    >
      {tabTitle}
    </div>
  );
};
