import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// pages
import Product from "./pages/product/index";
import Home from "./pages/home/index";
import Navbar from "./pages/header";
import Footer from "./pages/footer";
import Register from "./pages/register";
import Verify from "./pages/verify";

function Main() {
  return (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
