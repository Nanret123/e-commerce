import React from 'react';
import {customersData } from "../../Data/Data.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Header from "../../components/Header/Header.jsx";
import "./Customers.css";

const Customers = () => {
	return (
		<div>
			<Sidebar />
			<Header />
			<div className="table-wrapper">
		<h3 className="main-title">Customers</h3>
			<div className="table-container">
				<table width="100%">
					<thead>
						<tr>
							<th>Photo</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
					{customersData.map((data, index) => {
						const{img, firstName, lastName, email, phone, address} = data;
						return (
						
               <tr key={index}>
               	<td><div className="data">
               			<img src={img} alt="" className="img"/>
               		</div>
               	</td>
               	<td>{firstName}</td>
               	<td>{lastName}</td>
               	<td>{email}</td>
               	<td>{phone}</td>
               	<td>{address}</td>
              
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

export default Customers