import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../state/index";
import "./OrdersPage.css";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const orders = await fetch("http://localhost:8080/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await orders.json();
      //console.log(data[0]);
      setOrders(data);
    } catch (error) {
      setError({ error: error });
      navigate("/error");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (orders.length <= 0) {
    return <h1>No Orders Yet!</h1>;
  } else {
    return (
      <div className="table-container">
        <table width="100">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr key={item._id}>
                  <td>#{item._id}</td>
                  <td>
                    {item.products.map((p, index) => {
                      return (
                        <div className="data" key={index}>
                          {p.product.title}
                          <span>{p.quantity}</span>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul></ul>
      </div>
    );
  }
};

export default Order;
