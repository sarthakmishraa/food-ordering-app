import { useEffect, useState } from "react";
import { MenuCard } from "../components/MenuCard";
import { IMenuItem } from "../utils/types";
import { NetworkStatusEnum } from "../utils/constants";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Label } from "../components/Label";
import {
  getMenu,
  nextPageMenu,
  resetPageMenu,
  useMenu,
} from "../slices/menuSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import { LoadingScreen } from "../components/LoadingScreen";
import Input from "../components/Input";
import { useDebounce } from "../hooks/useDebounce";
import { PrimaryButton } from "../components/PrimaryButton";

export const Menu = () => {
  const dispatch = useAppDispatch();

  const {
    data: menuItems,
    networkStatus: menuNetworkStatus,
    hasMore: hasMoreMenuItems,
    totalElements,
  } = useAppSelector(useMenu);
  const [searchText, setSearchText] = useState<string>("");
  const getMenuItems = async (searchText: string) => {
    await dispatch(getMenu({ searchText })).unwrap();
  };

  useEffect(() => {
    if (menuNetworkStatus === "idle") {
      getMenuItems(searchText);
    }
  }, [menuNetworkStatus]);

  const searchInMenu = async (searchText: string) => {
    await dispatch(getMenu({ searchText })).unwrap();
  };

  const debouncedMenuSearch = useDebounce(
    searchInMenu,
    300
  );

  const handleMenuSearch = (searchText: string) => {
    setSearchText(searchText);
    dispatch(resetPageMenu());
    debouncedMenuSearch(searchText);
  };

  const loadMoreMenu = async () => {
    dispatch(nextPageMenu());
    await dispatch(getMenu({ searchText })).unwrap();
  };

  return (
    <div className="h-full flex flex-col space-y-4 items-center py-2">
      <Label
        text={`Today's Menu`}
        className="text-[color:var(--color-text-primary)]"
      />
      <div className="w-[60%]">
        <Input
          value={searchText}
          onChange={(val) => handleMenuSearch(val)}
          placeholder="Search for Chicken Biryani"
          inputClassName="py-2"
          autoFocus
        />
      </div>
      <Label
        text={`${totalElements} items`}
        className="text-[color:var(--color-text-primary)] text-sm font-normal w-full px-4 my-0"
      />
      {menuNetworkStatus === NetworkStatusEnum.Idle ||
      menuNetworkStatus === NetworkStatusEnum.Loading ? (
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
      <PrimaryButton
        text="Load More"
        disabled={!hasMoreMenuItems}
        onClick={loadMoreMenu}
      />
    </div>
  );
};
