import { useState } from 'react';
import { Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import HomeProduct from './components/HomeProduct';
import ProductDetailPage from './components/ProductDetails';

export default function App() {
  // État du panier
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // Filtre par catégorie
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Ajouter au panier
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Supprimer du panier
  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Mettre à jour la quantité
  const handleUpdateQty = (id: number, qty: number) => {
    if (qty <= 0) {
      handleRemove(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 font-body">
      {/* Navbar */}
      <Navbar cartItems={cartItems} onCartClick={() => setCartOpen(true)} />

       <Routes>
        <Route path="/" element={<HomeProduct selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} handleAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
      </Routes>

      {/* Panier */}
      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemove}
          onUpdateQty={handleUpdateQty}
        />
      )}
    </div>
  );
}
