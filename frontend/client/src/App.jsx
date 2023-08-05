/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./client/pages/Home/Home";
import ProductPage from "./client/pages/ProductPage/ProductPage";
import ScrollToTop from "./client/Components/ScrollToTop.jsx";
import CartPage from "./client/pages/CartPage/CartPage.jsx";
import OrdersPage from "./client/pages/ordersPage/OrdersPage.jsx";
import FormPage from "./client/pages/Form/Form.jsx";
import HomePage from "./client/pages/Home/Home.jsx";

import Navigation from "./client/Components/Navigation/Navigation.jsx";
import { useSelector } from "react-redux";

const App = () => {
  //const user = Boolean(useSelector(state => state.user));
  const user = Boolean(useSelector((state) => state.token));
  console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<FormPage />} />
            </>
          )}
          {user && (
            <>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </>
          )}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
