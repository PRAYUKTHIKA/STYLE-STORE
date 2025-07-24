import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Invoice } from './components/Invoice';
import { Login } from './components/Login';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [paymentMode, setPaymentMode] = useState('card');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });

    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 3000);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  };

  const handleCheckout = (details, mode) => {
    setDeliveryDetails(details);
    setPaymentMode(mode);
    setIsCartOpen(false);
    setShowInvoice(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showLoginMessage && (
          <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Please log in to add items to cart
          </div>
        )}

        {showCartMessage && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Item added to cart successfully!
          </div>
        )}

        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg ${
                !selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              All
            </button>
            {['Men', 'Women', 'kids', 'footwear'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {deliveryDetails && (
        <Invoice
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
          items={cartItems}
          details={deliveryDetails}
          paymentMode={paymentMode}
        />
      )}
    </div>
  );
}

export default App;