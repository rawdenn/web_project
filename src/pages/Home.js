import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import HomeSection from "../components/HomeSection";
import "../styles/Home.css";

// Image mapping for database filenames
const imageMap = {
  "Kuromi1.jpeg": assets.Kuromi,
  "caleb.jpeg": assets.caleb,
  "rafayel.jpeg": assets.rafayel,
};

function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestSellerIds = [2, 12, 13];
    
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        const sellers = bestSellerIds
          .map(id => data.find(product => product.id === id))
          .filter(Boolean)
          .map(product => ({
            ...product,
            images: product.images.map(filename => imageMap[filename] || filename)
          }));
        setBestSellers(sellers);
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const categories = [
    { name: "Earrings", img: assets.earrings },
    { name: "Bracelets", img: assets.gego },
    { name: "Keychains", img: assets.keychains },
    { name: "Necklaces", img: assets.necklaces },
  ];

  return (
    <div className="container-fluid p-0">

      {/* HERO SECTION */}
      <div className="hero-section position-relative text-white">
        <img
          src={assets.sanrio}
          alt="Jewelry Banner"
          className="img-fluid w-100"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <div className="hero-text position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="fw-bold display-4">Handcrafted Jewelry</h1>
          <p className="lead">Made with love, inspired by your story.</p>
          <Link to="/products" className="btn btn-light btn-lg mt-3">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container mt-5">

        {/* FEATURED CATEGORIES */}
        <HomeSection title="Shop by Category">
          <div className="row text-center">
            {categories.map((cat) => (
              <div className="col-md-3 mb-4" key={cat.name}>
                <div className="card shadow-sm border-0">
                  <img src={cat.img} className="card-img-top" alt={cat.name} />
                  <div className="card-body">
                    <h5 className="card-title">{cat.name}</h5>
                    <Link
                      to={`/products?category=${cat.name}`}
                      className="btn btn-outline-dark btn-sm"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </HomeSection>

        {/* BEST SELLERS */}
        <HomeSection title="Best Sellers">
          <div className="row">
            {bestSellers.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img src={product.images} alt={product.name} className="card-img-top" />
                  <div className="card-body text-center">
                    <h5>{product.name}</h5>
                    <p className="fw-bold text-primary">${product.price}</p>
                    <Link to="/products" className="btn btn-dark btn-sm mt-2">
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </HomeSection>

        {/* CUSTOM JEWELRY CTA */}
        <HomeSection center small>
          <div className="custom-cta shadow-sm">
            <h2 className="mb-3">Design Your Own Jewelry</h2>
            <p>Create a bracelet, necklace, or keychain personalized just for you.</p>
            <Link to="/customize" className="btn btn-dark btn-lg mt-2">
              Start Customizing
            </Link>
          </div>
        </HomeSection>

        {/* INSTAGRAM GRID */}
        <HomeSection title="Follow Us on Instagram">
          <div className="row g-3 justify-content-center">
            <div className="col-6 col-md-3">
              <a
                href="https://www.instagram.com/yunoojewels/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={assets.insta1}
                  className="img-fluid insta-img"
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </HomeSection>


      </div>
    </div>
  );
}

export default Home;
