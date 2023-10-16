import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../state";


const Modal = ({setModal, id}) => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);

	const deleteItem = async () => {
    const products = await fetch(`https://e-commerce-azure-six.vercel.app/product/${id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await products.json();
    dispatch(setItems({ items: data }));
     navigate("/");
  };
	
return (

		<div className="modal">
		<div className="overlay"></div>
		<div className="modal-content">
			<p>Are You Sure You Want to Countinue?</p>
			<div className="modal-btn">

				<button onClick={deleteItem}>
        
        Yes
        
				</button>
				<button onClick={()=>setModal(false)}>No</button>
			</div>
		</div>
			
			
		</div>
	)
}

export default Modal