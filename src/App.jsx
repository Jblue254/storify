// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';      // Your existing catalog grid
import { Login } from './pages/Login';                  // Your existing login card
import { Cart } from './pages/Cart';                    // Your existing shopping cart
import { ProductDetail } from './pages/ProductDetail';  // 👈 1. Import ProductDetail page
import { Checkout } from './pages/Checkout';            // 👈 2. Import Checkout page
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Routes>
          {/* Main Catalog Storefront Grid */}
          <Route path="/" element={<ProductList />} />
          
          {/* Dynamic Item Detail Pages */}
          <Route path="/product/:productId" element={<ProductDetail />} /> {/* 👈 3. Dynamic route pattern */}
          
          {/* Customer Basket Overview */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Secure Transaction Completion Terminal */}
          <Route path="/checkout" element={<Checkout />} /> {/* 👈 4. Checkout path hook */}
          
          {/* Authentication Access Panel */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;