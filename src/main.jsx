import React from "react";
import { useSelector } from "react-redux";
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
import Payment from "./pages/payment";
import History from "./pages/history";
import History_Detail from "./pages/history-detail";

function Main() {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  return (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product_Detail />} />
        <Route
          path="/cart"
          element={user.id ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/payment"
          element={user.id ? <Payment /> : <Navigate to="/" />}
        />
        <Route
          path="/history"
          element={user.id ? <History /> : <Navigate to="/" />}
        />
        <Route
          path="/history/:id"
          element={user.id ? <History_Detail /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
