import React, { useState } from "react";
import { assets } from "../assets/assets";
import "../styles/Home.css";

const About = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container my-5">

        {/* HERO */}
        <div className="position-relative text-white mb-5">
          <img
            src={assets.Melody}
            alt="About Banner"
            className="img-fluid w-100 rounded-4"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="hero-text position-absolute text-white top-50 start-50 translate-middle text-center">
            <h1 className="display-4 fw-bold">About & Contact</h1>
            <p className="lead">Learn more about Yunoo Jewels & get in touch</p>
          </div>
        </div>

        {/* ABOUT / STORY */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0 ps-5">
            <h2 className="fw-bold mb-3 display-6">Our Story</h2>
            <p className="lead">
              Yunoo Jewels is a handcrafted jewelry shop inspired by love, art, and
              your personal story. We carefully design necklaces, bracelets, earrings,
              and keychains with premium materials and attention to detail.
            </p>
            <p className="lead">
              Each piece is made to shine, perfect for gifts or daily wear.
              We take pride in offering fast delivery and personalized options.
            </p>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={assets.logo}
              alt="Logo"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>


      {/* CONTACT INFO */}
      <div className="row mb-5 text-center">
        <div className="col-md-4 mb-3">
          <h5>Email</h5>
          <p>contact@yunoojewels.com</p>
        </div>
        <div className="col-md-4 mb-3">
          <h5>Instagram</h5>
          <p>@yunoojewels</p>
        </div>
        <div className="col-md-4 mb-3">
          <h5>WhatsApp</h5>
          <p>+961 70 000 000</p>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <h2 className="fw-bold mb-4 text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Your Message"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-dark btn-lg" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default About;
