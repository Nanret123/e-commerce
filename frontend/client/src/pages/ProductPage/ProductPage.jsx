import React from "react";
import "./ProductPage.css";
import { IoIosRemove } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { product } from "../../data.js";

const ProductPage = () => {
	const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

    const addToCart = async () => {
    const products = await fetch("https://e-commerce-six-pink.vercel.app/add-to-cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await products.json();
    dispatch(setItems({ items: data }));
    
  };

	return (
		<div>
			{product.map((item) => (
				<div className="singleProd-wrapper" key={item.id}>
					<div className="singleProd-shop">
						<div className="image-container">
							<img src={item.img} alt="" />
						</div>
						<div className="singleProd-info">
							<h2>{item.title}</h2>
							<p>{item.desc}</p>
							<span>$ {item.price}</span>
							<div className="add-container">
								<div className="amt-container">
							<IoIosRemove />
							<span>{item.quantity}</span>
							<AiOutlinePlus />
						</div>
						<button className="prod-btn">ADD TO CART</button>
							</div>
							
					</div>
						</div>

				</div>
			))}
		</div>
	);
};

export default ProductPage;
