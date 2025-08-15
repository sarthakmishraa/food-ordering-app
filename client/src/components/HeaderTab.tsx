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
      } cursor-pointer hover:underline text-lg font-normal`}
      onClick={(e) => onClick(e)}
    >
      {tabTitle}
    </div>
  );
};
