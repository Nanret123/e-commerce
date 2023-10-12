import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleProduct from "./pages/SingleComponent/SingleProd.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Error from "./pages/Error/Error.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import OrdersPage from "./pages/ordersPage/OrdersPage.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import Login from "./pages/Form/Login.jsx";
import Signup from "./pages/Form/Signup.jsx";
import EditProduct from "./pages/EditProduct/EditProduct.jsx";
import NewProduct from "./pages/NewProduct/NewProduct.jsx";

import Navigation from "./Components/Navigation/Navigation.jsx";
import { useSelector } from "react-redux";

const App = () => {
  const user = Boolean(useSelector((state) => state.auth.token));
 
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
         <Navigation />
        <Routes>
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && !user.isAdmin &&(
            <>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </>
          )}
          {user && !user.isAdmin && (
            <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/product/:id/edit" element={<EditProduct />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            </>
          )}
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;