/* eslint-disable no-unused-vars */
import React from "react";
import { IoIosRemove } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { product } from "../../data.js";

const Cart = () => {
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-wrapper">
        <div className="shop">
          <div className="box">
            <img src="" alt="" />
            <div className="cart-content">
              <h3>{product.title}</h3>
              <h4>$ {product.price}</h4>
              <AiOutlinePlus />
              <p className="unit">Quantity : {product.quantity}</p>
              <IoIosRemove />
              <div className="prod-price">
                $ {product.price * product.quantity}
              </div>
            </div>
          </div>
        </div>

        <div className="right-bar">
          <h2>Order Summary</h2>
          <p>
            <span>Subtotal</span> <span>{product.cart.total}</span>
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
            <span>Total</span> <span>{product.cart.total}</span>
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Cart;
