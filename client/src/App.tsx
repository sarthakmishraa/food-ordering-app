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

function App() {
  return (
    <div className="px-20 py-4 h-screen w-full">
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
