import React from 'react';
import { Link } from "react-router-dom";


const CategoryItem = ({cat, img, title}) => {
	return (
		<div className="item-container">
			<Link to={`/category/${cat}`}>
				<img src={img} alt="" />
				<div className="item-info">
					<h2>{title}</h2>
					<button>SHOP NOW</button>
				</div>
			</Link>
		</div>
	)
}

export default CategoryItem;