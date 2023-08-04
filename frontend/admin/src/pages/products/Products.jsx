import React from 'react';
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Header from "../../components/Header/Header.jsx";
import {productsData } from "../../Data/Data.jsx";
import "./Products.css";

const Products = () => {
	return (
			<div>
			<Sidebar />
			<Header />
			<div className="table-wrapper">
		<h3 className="main-title">Products</h3>
			<div className="table-container">
				<table width="100%">
					<thead>
						<tr>
							<th>Thumbnail</th>
							<th>Title</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Brand</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
					{productsData.map((data, index) => {
						const{img, title, price, stock, brand, category} = data;
						return (
						
               <tr key={index}>
               	<td><div className="data">
               			<img src={img} alt="" className="img"/>
               		</div>
               	</td>
               	<td>{title}</td>
               	<td>{price}</td>
               	<td>{stock}</td>
               	<td>{brand}</td>
               	<td>{category}</td>
                <td>
                	<button>Edit</button>
                </td>
               </tr>
							)
					})}
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		</div>
	)
}

export default Products