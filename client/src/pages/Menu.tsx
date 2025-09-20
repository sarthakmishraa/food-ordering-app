import { useEffect } from "react";
import { MenuCard } from "../components/MenuCard";
import { IMenuItem } from "../utils/types";
import { NetworkStatusEnum } from "../utils/constants";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Label } from "../components/Label";
import { getMenu, useMenu } from "../slices/menuSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import { LoadingScreen } from "../components/LoadingScreen";

export const Menu = () => {
  const dispatch = useAppDispatch();
  const {
    data: menuItems,
    networkStatus: menuNetworkStatus,
  } = useAppSelector(useMenu);

  const getMenuItems = async () => {
    await dispatch(getMenu());
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div className="h-full flex flex-col space-y-4 items-center">
      <Label
        text="Today's Menu"
        className="text-[color:var(--color-text-primary)]"
      />
      {menuNetworkStatus === NetworkStatusEnum.Loading ? (
        <LoadingScreen />
      ) : (
        <>
          {menuNetworkStatus === NetworkStatusEnum.Error ||
          menuItems === null ? (
            <SomethingWentWrong />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 gap-4">
              {menuItems?.map((item: IMenuItem) => (
                <MenuCard key={item?.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
