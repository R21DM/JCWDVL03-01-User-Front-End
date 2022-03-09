import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

// pages
import Product from "./pages/product/index";
import Home from "./pages/home/index";
import Navbar from "./pages/header";
import Footer from "./pages/footer";
import Admin from "./pages/admin";

function Main() {
  const user = useSelector((state) => state.user);
  var isAdmin = false;
  console.log(user);
  user.role === 1 ? (isAdmin = true) : (isAdmin = false);
  return isAdmin ? (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </div>
  ) : (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
