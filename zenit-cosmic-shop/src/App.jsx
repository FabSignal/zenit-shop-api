import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

/**
 * App keeps minimal global states:
 * - cart: array of cart items
 * - isAuthenticated: boolean for protected routes
 *
 * Cart item shape:
 * { id: number|string, title: string, price: number, image: string, qty: number }
 */
export default function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Add product; if it exists, increase quantity
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Decrease quantity or remove if qty would reach 0
  const decreaseQty = (id) => {
    setCart((prev) => {
      const item = prev.find((p) => p.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p));
    });
  };

  // Remove product entirely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear all
  const clearCart = () => setCart([]);

  const toggleAuth = () => setIsAuthenticated((v) => !v);

  return (
    <>
      <Navbar
        cartCount={cart.reduce((acc, it) => acc + it.qty, 0)}
        isAuthenticated={isAuthenticated}
        onToggleAuth={toggleAuth}
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                items={cart}
                onDecrease={decreaseQty}
                onRemove={removeFromCart}
                onClear={clearCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={addToCart} />}
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Checkout items={cart} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>404 — Página no encontrada</h2>} />
        </Routes>
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Zenit — Cosmic Shop
      </footer>
    </>
  );
}
