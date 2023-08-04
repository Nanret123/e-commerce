import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import { Link } from "react-router-dom";

const Product = ({img, _id}) => {

	return (
		<div className="prod-container">
     <div className="cicle"></div>
		 <img src={img} alt="" />
		 <div className="prod-info">
		 	<div className="prod-icon">
		 		<AiOutlineShoppingCart />
		 	</div>
		 		<div className="prod-icon">
		 		<Link to={`/product/${_id}`}>
		 			<BsSearch />
		 		</Link>
		 	</div>
		 		<div className="prod-icon">
		 		<AiOutlineHeart />
		 	</div>
		 </div>
		</div>
	)
}

export default Product