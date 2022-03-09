import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// pages
import Product from "./pages/product/index";
import Home from "./pages/home/index";
import Navbar from "./pages/header";
import Footer from "./pages/footer";
import Register from "./pages/register";
import Verify from "./pages/verify";
import Product_Detail from "./pages/products-detail";
import Cart from "./pages/cart";

function Main() {
  <div className="main-container">
    <Navbar />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<Product_Detail />} />
      <Route
        path="/cart"
        // element={user.id ? <Cart /> : <Navigate to="/" />}
        element={<Cart />}
      />
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
  </div>;
}

export default Main;
