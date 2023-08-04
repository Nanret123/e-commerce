import React from 'react';
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Header from "../../components/Header/Header.jsx";
import {ordersData } from "../../Data/Data.jsx";
import "./Orders.css";

const Orders = () => {
	return (
		<div>
			<Sidebar />
			<Header />
			<div className="table-wrapper">
		<h3 className="main-title">Latest Orders</h3>
			<div className="table-container">
				<table width="100%">
					<thead>
						<tr>
							<th>Title</th>
							<th>Price</th>
							<th>Discounted Price</th>
							<th>Quantity</th>
							<th>Total</th>
							
						</tr>
					</thead>
					<tbody>
					{ordersData.map((data, index) => {
						const{product, price, discountedPrice, quantity} = data;
						return (
						
               <tr key={index}>
               	<td>{product}</td>
               	<td>${price}</td>
               	<td>{discountedPrice}</td>
               	<td>{quantity}</td>
               	<td>{price * quantity}</td>
              
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

export default Orders