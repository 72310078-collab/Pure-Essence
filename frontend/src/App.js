import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import About from "./pages/about";
import Cart from "./pages/cart";
import ClientLogin from "./pages/ClientLogin";
import ClientRegister from "./pages/ClientRegister";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdminRoute from "./auth/ProtectedAdminRoute";

import { CartProvider } from "./pages/CartContext";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function ClientLayout() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />
      </Routes>
      
    </div>
  );
}

function AdminLayout() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      
      <CartProvider>
        <BrowserRouter>
        <NavBar />
          <AdminLayout />
          <ClientLayout />
        </BrowserRouter>
      </CartProvider>
      <Footer />
    </AuthProvider>
  
  );
}

export default App;

