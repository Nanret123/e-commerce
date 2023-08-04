import React from 'react';
import { categories } from "../../data.js";
import Product from "./Product.jsx";
import "./ProductList.css";

const ProductList = () => {
	
	return (
		<div className="prodlist-container">
		 <h2>New Arrivals</h2>
		  <div className="products">
		  	{categories.map(item => <Product {...item} key={item.id} />)
		  }
		  </div>
		
		</div>
	)
}

export default ProductList;