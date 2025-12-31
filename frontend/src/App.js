
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/shop';
import Contact from './pages/contact';
import About from './pages/about';
import Cart from './pages/cart';
import Login from './pages/login';

import { CartProvider } from "./pages/CartContext";
import { AuthProvider } from "./pages/AuthContext";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
 
    <Router>
     <AuthProvider>
      <CartProvider>

        <NavBar />

      
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            
          

          </Routes>
        

        <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  
);
}

export default App;
