import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
