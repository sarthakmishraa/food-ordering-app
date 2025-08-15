import { useEffect, useState } from "react";
import { MenuCard } from "../components/MenuCard";
import { IMenuItem } from "../utils/types";
import { Banner } from "../components/Banner";

export const Menu = () => {
  const [loadingMenuItems, setLoadingMenuItems] =
    useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<
    IMenuItem[] | null
  >(null);

  const getMenuItems = () => {
    setLoadingMenuItems(true);
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Error fetching menu: ", error);
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
      <div className="text-xl font-medium">
        Today's Menu
      </div>
      {loadingMenuItems ? (
        <Banner label={`Loading...`} />
      ) : (
        <>
          {menuItems === null ? (
            <>Something went wrong</>
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
