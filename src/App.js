// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CartPage from "./screens/CartPage";
import { CartProvider } from "./components/ContextReducer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; 
import "./App.css";
import MyOrders from "./screens/MyOrders";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
