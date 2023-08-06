import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import OrdersPage from "./pages/ordersPage/OrdersPage.jsx";
import FormPage from "./pages/Form/Form.jsx";
import HomePage from "./pages/Home/Home.jsx";

import Navigation from "./Components/Navigation/Navigation.jsx";
import { useSelector } from "react-redux";

const App = () => {
  //const user = Boolean(useSelector(state => state.user));
  const user = Boolean(useSelector((state) => state.token));
 
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        {user && <Navigation />}
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