import { useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import OrdersPage from "./pages/Orders/Orders.jsx";
import ProductsPage from "./pages/products/Products.jsx";
import CustomersPage from "./pages/customers/Customers.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin" element={< AdminDashboard/>} />
          <Route path="/admin/customers" element={<CustomersPage/>} />
          <Route path="/admin/products" element={<ProductsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
