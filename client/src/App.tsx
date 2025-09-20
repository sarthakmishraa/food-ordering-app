import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Landing } from "./pages/Landing.tsx";
import { Menu } from "./pages/Menu.tsx";
import { Header } from "./components/Header.tsx";
import { Help } from "./pages/Help.tsx";
import { Cart } from "./pages/Cart.tsx";
import { Orders } from "./pages/Orders.tsx";
import { Toaster } from "react-hot-toast";
import {
  useAppDispatch,
  useAppSelector,
} from "./store/hooks.ts";
import { applyThemeColors } from "./utils/helper";
import {
  getUIConfig,
  useUIConfig,
} from "./slices/appContextSlice.ts";
import { NetworkStatusEnum } from "./utils/constants.ts";

function App() {
  const dispatch = useAppDispatch();
  const { networkStatus: appConfigNetworkStatus } =
    useAppSelector(useUIConfig);

  const getAppConfig = async () => {
    return await dispatch(getUIConfig()).unwrap();
  };

  const configureTheme = async () => {
    const resp = await getAppConfig();
    if (resp) {
      applyThemeColors(resp);
      document.title = resp?.appTitle;
    }
  };

  React.useEffect(() => {
    if (appConfigNetworkStatus === NetworkStatusEnum.Idle) {
      configureTheme();
    }
  }, [appConfigNetworkStatus]);

  return (
    <div className="px-20 py-4 h-screen w-full bg-[var(--color-bg-primary)]">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/help" element={<Help />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Toaster position="bottom-left" />
      </Router>
    </div>
  );
}

export default App;
