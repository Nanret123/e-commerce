import React from 'react';
import "./singleProd.css";
import Navigation from "../../Components/Navigation/Navigation.jsx";
import { IoIosRemove } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import {product} from "../../data.js";



const SingleProd = () => {
	return (
		<div className="prod-container">
			<Navigation />
			<div className="prod-wrapper">
				<div className="image-container">
					<img src="" alt="" />
				</div>
				<div className="prod-info">
					<h1>{product.title}</h1>
					<p>{product.desc}</p>
					<span>$ {product.price}</span>
				</div>
				<div className="amt-container">
					<IoIosRemove />
					<span>{product.quantity}</span>
          <AiOutlinePlus />
				</div>
				<button className="prod-btn">ADD TO CART</button>
			</div>
		</div>
	)
}

export default SingleProd;