import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "../styles/NavBar.css";
import { assets } from "../assets/assets";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = ({ search, setSearch }) => {
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={assets.logo} alt="Logo" className="me-2" style={{ height: "40px" }} />
          Yunoo Jewels
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/products" ? "active" : ""}`} to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/customize" ? "active" : ""}`} to="/customize">Customize</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
            
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", background: "none", cursor: "pointer" }}
                >
                  👤 {user?.name || "Account"}
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Link 
                      to="/orders" 
                      className={`dropdown-item ${location.pathname === "/orders" ? "active" : ""}`}
                    >
                      📋 My Orders
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* Search */}
            <li className="nav-item mx-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search jewelry..."
                value={search}
                onChange={handleSearchChange}
                style={{ width: "100%", maxWidth: "250px" }}
              />
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link to="/cart" className="btn btn-outline-dark position-relative">
                🛒 Cart
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {/* {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} */}
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
