import { useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";
import HomeProduct from "./components/HomeProduct";
import ProductDetailPage from "./components/ProductDetails";

export default function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // Filtre par catégorie
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="min-h-screen bg-stone-50 font-body">
      {/* Navbar */}
      <Navbar onCartClick={() => setCartOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <HomeProduct
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>

      {/* Panier */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </div>
  );
}
