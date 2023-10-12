import React, { useEffect } from "react";
import Product from "./Product.jsx";
import "./ProductList.css";



const ProductList = ({items}) => {
  

  return (
    <div className="prodlist-container">
      <h2>Our Latest Products</h2>
      <div className="products">
        {items.map((item) => (
          <Product {...item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
