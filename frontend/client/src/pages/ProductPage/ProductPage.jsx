/* eslint-disable no-unused-vars */
import React from "react";
import "./ProductPage.css";
import Navigation from "../../Components/Navigation/Navigation.jsx";
import { IoIosRemove } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { product } from "../../data.js";

const ProductPage = () => {
  return (
    <div>
      {product.map((item) => (
        <div className="singleProd-wrapper" key={item.id}>
          <div className="singleProd-shop">
            <div className="image-container">
              <img src={item.img} alt="" />
            </div>
            <div className="singleProd-info">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <span>$ {item.price}</span>
              <div className="add-container">
                <div className="amt-container">
                  <IoIosRemove />
                  <span>{item.quantity}</span>
                  <AiOutlinePlus />
                </div>
                <button className="prod-btn">ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
