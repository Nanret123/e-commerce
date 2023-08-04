import React from 'react';
import {tableData } from "../../Data/Data.jsx";
import "./Table.css";

const Table = () => {
	return (
		<div className="table-wrapper">
		<h3 className="main-title">Latest Transactions</h3>
			<div className="table-container">
				<table width="100%">
					<thead>
						<tr>
							<th>Tracking ID</th>
							<th>Product</th>
							<th>Cusomer</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Payment Method</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
					{tableData.map((data, index) => {
						return (
               <tr key={index}>
               	<td>{data.id}</td>
               	<td>
               		<div className="data">
               			<img src={data.img} alt="" className="img"/>
               			{data.product}
               		</div>
               	</td>
               	<td>{data.customer}</td>
               	<td>{data.date}</td>
               	<td>{data.amount}</td>
               	<td>{data.method}</td>
               	<td>{data.status}</td>
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
	)
}

export default Table

// <div className="card-container">
//       <h3 className="main-title">Today&apos;s data</h3>
//       <div className="card-wrapper">
//       	{cardsData.map((card, index) => {
//         return (
//           <div  key={index}>
//             <Card {...card} Oicon={<card.icon />} />
//           </div>
//         );
//       })}
//       </div>
      
//     </div>