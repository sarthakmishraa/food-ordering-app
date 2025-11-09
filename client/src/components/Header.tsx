import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTab } from "./HeaderTab";
import { useAppSelector } from "../store/hooks";
import { useCart } from "../slices/cartSlice";
import { PrimaryButton } from "./PrimaryButton";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { REACT_ICONS_PI_ICON_SIZE } from "../utils/constants";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const cart = useAppSelector(useCart);
  const noOfItemsInCart = cart?.length;

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleHelpClick = () => {
    navigate("/help");
  };

  const handleGustoClick = () => {
    navigate("/gusto");
  };

  const handleOrdersClick = () => {
    navigate("orders");
  };

  const handleCartClick = () => {
    navigate("cart");
  };

  return (
    <div className="flex justify-between p-4">
      <div className="flex space-x-4">
        <HeaderTab
          tabTitle="Home"
          onClick={handleHomeClick}
          isActiveTab={pathname === "/"}
        />
        <HeaderTab
          tabTitle="Menu"
          onClick={handleMenuClick}
          isActiveTab={pathname === "/menu"}
        />
        <HeaderTab
          tabTitle="Ask Gusto"
          onClick={handleGustoClick}
          isActiveTab={pathname === "/gusto"}
        />
        <HeaderTab
          tabTitle="Help"
          onClick={handleHelpClick}
          isActiveTab={pathname === "/help"}
        />
      </div>
      <div className="flex items-center space-x-4">
        <HeaderTab
          tabTitle="Orders"
          onClick={handleOrdersClick}
          isActiveTab={pathname === "/orders"}
        />
        <PrimaryButton
          extraButtonClassNames="py-0.5 border-none flex items-center"
          onClick={handleCartClick}
        >
          <span className="flex items-center space-x-1">
            <div>
              <PiShoppingCartSimpleFill
                size={REACT_ICONS_PI_ICON_SIZE}
              />
            </div>
            <div>{noOfItemsInCart}</div>
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
};
