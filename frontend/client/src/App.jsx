/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./client/pages/Home/Home";
import ProductPage from "./client/pages/ProductPage/ProductPage";
import ScrollToTop from "./client/Components/ScrollToTop.jsx";
import CartPage from "./client/pages/CartPage/CartPage.jsx";
// import FormPage from "./pages/Form/Form.jsx";
// import FeedPage from "./pages/Home/Home.jsx";

import Navigation from "./client/Components/Navigation/Navigation.jsx";
import { useSelector } from "react-redux";

const App = () => {
  //const user = Boolean(useSelector(state => state.user));

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        {/* <Navigation /> */}
        <Routes>
          <Route path="/orders" element={< OrdersPage/>} />
          {/*{!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </>
              )}
            {user && (
              <>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} /> 
              </>
              )}
             {user && user.isAdmin && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/product/:id/edit" element={<EditProductPage />} /> 
              </>
              )}
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/product/category/:category" element={<CategoryPage />} /> 
               <Route path="/new-product" element={<AdminDashboard />} />
                <Route path="*" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
