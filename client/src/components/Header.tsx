import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTab } from "./HeaderTab";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleHelpClick = () => {
    navigate("/help");
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
          tabTitle="Help"
          onClick={handleHelpClick}
          isActiveTab={pathname === "/help"}
        />
      </div>
      <div className="flex space-x-4">
        <HeaderTab
          tabTitle="Orders"
          onClick={handleOrdersClick}
          isActiveTab={pathname === "/orders"}
        />
        <HeaderTab
          tabTitle="Cart"
          onClick={handleCartClick}
          isActiveTab={pathname === "/cart"}
        />
      </div>
    </div>
  );
};
