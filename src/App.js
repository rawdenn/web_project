import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import About from './pages/About';
import Customize from './pages/Customize';
import Login from './pages/login';
import Register from './pages/register';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer';
import { useState } from 'react';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <Router>
        <CartProvider>
          <ScrollToTop />
          <NavBar search={search} setSearch={setSearch} />
          <div style={{ minHeight: "80vh", paddingTop: "60px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products search={search} />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
          <Footer />
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
