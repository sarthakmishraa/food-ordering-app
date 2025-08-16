import { useEffect } from "react";
import { MenuCard } from "../components/MenuCard";
import { IMenuItem } from "../utils/types";
import { Banner } from "../components/Banner";
import { NetworkStatusEnum } from "../utils/constants";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Label } from "../components/Label";
import { getMenu, useMenu } from "../slices/menuSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

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
    <div className="flex flex-col space-y-4 items-center">
      <Label text="Today's Menu" />
      {menuNetworkStatus === NetworkStatusEnum.Loading ? (
        <Banner label={`Loading...`} />
      ) : (
        <>
          {menuNetworkStatus === NetworkStatusEnum.Error ||
          menuItems === null ? (
            <SomethingWentWrong />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 p-2 gap-4">
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
