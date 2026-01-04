import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">

        <div className="row">

          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none text-light">
              <img src={assets.logo} alt="Logo" style={{ height: "40px" }} className="me-2" />
              <span className="fs-5 fw-bold">Yunoo Jewels</span>
            </Link>
            <p className="text-muted">
              Handcrafted jewelry made with love. Follow us on Instagram for the latest designs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
              <li><Link to="/customize" className="text-light text-decoration-none">Custom Jewelry</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex mb-3">
              <a href="https://www.instagram.com/yunoojewels/" target="_blank" rel="noreferrer" className="text-light fs-4 me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-light fs-4 me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.tiktok.com/yunoojewels" target="_blank" rel="noreferrer" className="text-light fs-4 me-3">
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} Yunoo Jewels. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
