// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- IMPORT SECURITY WRAPPER
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Footer from "./components/Footer";

// Pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AdminOverview from "./pages/AdminOverview";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <Routes>
          {/* Public Storefront Routes */}
          <Route path='/' element={<ProductList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/success" element={<CheckoutSuccess />} />

          {/* PROTECTED Checkout Route (Required by Project Rubric) */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />

          {/* Nested Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminOverview />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Routes>

        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;