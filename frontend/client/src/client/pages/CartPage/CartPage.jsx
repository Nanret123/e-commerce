/* eslint-disable no-unused-vars */
import React from "react";
import { BiTrash } from "react-icons/bi";
import { product } from "../../data.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CartPage.css";

const Cart = () => {
  return (
    <div className="cart-wrapper">
      <h2>Shopping Cart</h2>
      <div className="project">
        <div className="shop">
          <div className="box">
            <img src={product.img} alt="" />
            <div className="cart-content">
              <h3>{product.title}</h3>
              <h4>$ {product.price}</h4>

              <p className="unit">Quantity : {product.quantity}</p>
              <p className="btn-area">
                <BiTrash className="trash" />
                <span className="btn2">Remove</span>
              </p>
              <div className="prod-price">
                Price: $ {product.price * product.quantity}
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
          <button>
            <AiOutlineShoppingCart className="check" /> CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
