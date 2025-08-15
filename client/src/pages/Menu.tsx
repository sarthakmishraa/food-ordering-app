import { useEffect, useState } from "react";
import { MenuCard } from "../components/MenuCard";
import { IMenuItem } from "../utils/types";
import { Banner } from "../components/Banner";
import toast from "react-hot-toast";
import { toastStyles } from "../utils/constants";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Label } from "../components/Label";

export const Menu = () => {
  const [loadingMenuItems, setLoadingMenuItems] =
    useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<
    IMenuItem[] | null
  >(null);

  const BE_API_URL = import.meta.env.VITE_BE_URL;

  const getMenuItems = () => {
    setLoadingMenuItems(true);
    fetch(`${BE_API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Error fetching menu: ", error);
        toast.error("Something went wrong", {
          style: toastStyles,
        });
      })
      .finally(() => {
        setLoadingMenuItems(false);
      });
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div className="flex flex-col space-y-4 items-center">
      <Label text="Today's Menu" />
      {loadingMenuItems ? (
        <Banner label={`Loading...`} />
      ) : (
        <>
          {menuItems === null ? (
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
