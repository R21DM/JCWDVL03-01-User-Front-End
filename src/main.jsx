import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCartData } from "../src/actions/cart-actions";
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
import Change from "./pages/change"

function Main() {
  return (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<Change />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product_Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<History_Detail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
