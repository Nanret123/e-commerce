/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { product } from "../../data.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { setError } from "../../state";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    try {
      const products = await fetch("https://e-commerce-six-pink.vercel.app/get-cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await products.json();
      setCartItems(data.products);
      setTotal(+data.totalSum);
      console.log(cartItems);

    } catch (error) {
      setError({ error: error });
      navigate("/error");
    }
  };

  const handleDelete = async (id) => {
    const product = await fetch(`https://e-commerce-azure-six.vercel.app/delete-cart/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const cart = await product.json();
    setCartItems(cart);
      };

  const handleSubmit = async () => {
    const response = await fetch(`https://e-commerce-azure-six.vercel.app/checkout-success`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
      };

  useEffect(() => {
    getCart();
  }, [cartItems]);

  {if(cartItems <= 0){
    return (
    <div>No Cart Items </div>
      )
  }}

  return (
    <div className="cart-wrapper">
      <h2>Shopping Cart</h2>
      <div className="project">
        <div className="shop">
          {cartItems.map((item) => {
            const total = item.productId.price * item.quantity;

            return (
              <div className="box" key={item._id}>
                <img
                  src={`http://localhost:8080/${item.productId.imagePath}`}
                  alt=""
                />
                <div className="cart-content">
                  <h3>{item.productId.title}</h3>
                  <h4>$ {item.productId.price}</h4>

                  <p className="unit">
                    Quantity :{" "}
                    <input
                      type="number"
                      value={item.quantity}
                      style={{ width: "50px", height: "25px" }}
                    />{" "}
                    <button
                      className="btn-area"
                      onClick={() => handleDelete(item._id)}
                    >
                      <BiTrash className="trash" />
                      <span className="btn2">Remove</span>
                    </button>
                  </p>

                  <div className="prod-price">Price: $ {total.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="right-bar">
          <h2>Order Summary</h2>
          <p>
            <span>Subtotal</span> <span>{total}</span>
          </p>
          <hr />
          <p>
            <span>Tax (5%)</span> <span>$6</span>
          </p>
          <hr />
          <p>
            <span>Shipping</span> <span>$15</span>
          </p>
          <hr />
          <p>
            <span>Total</span> <span>{total}</span>
          </p>
          {/*<StripeCheckout
           stripeKey = "pk_test_51Lx90pE5GRwztLrEaVR67t6UTU3R9ibo53N3p7eJM2kByy6taWXCZyNeOjlvZdQMUxMSiWt9W49Sk3t1ioIPg1tx00gKzRmqDV"
           token={handleToken}
           amount = {(total * 100).toFixed(2)}
           billingAddress 
           ShoppingAddress 
           label="Pay Now"
           name="Pay with Credit Card"
           description={`Your Total Is ${(total * 100).toFixed(2)}`}

           />*/}
          <button onClick={() => handleSubmit()}>
            <AiOutlineShoppingCart className="check" /> CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
