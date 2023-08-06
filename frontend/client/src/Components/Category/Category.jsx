import React from 'react';
import "./Category.css";
import {categories} from "../../data.js";
import CategoryItem from "./CategoryItem.jsx";

const Category = () => {
	return (
		<div className="cat-container">
			{categories.map(item => {
				return <CategoryItem {...item} key={item.id} />
			})}
		</div>
	)
}

export default Category