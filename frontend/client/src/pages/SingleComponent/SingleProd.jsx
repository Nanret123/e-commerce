import React, { useEffect, useState } from "react";
import "./singleProd.css";
import { IoIosRemove } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { product } from "../../data.js";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../state/cartReducer.jsx";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/Modal.jsx";
import { setUser } from "../../state";

const SingleProd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const getItem = async () => {
    const product = await fetch(`https://e-commerce-azure-six.vercel.app/product/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await product.json();
    setItem(data);
  };

  useEffect(() => {
    getItem();
  }, [id]);

  const cartBody = {
    quantity: quantity,
    productId: id,
  };

  const addToCart = async () => {
    const product = await fetch(`https://e-commerce-azure-six.vercel.app/add-to-cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartBody),
    });
    const user = await product.json();
    console.log(user);
    dispatch(setUser({ user: user }));
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const { _id, title, price, description, imagePath } = item;

  return (
    <div className="single-prod">
      <div className="single-wrapper">
        <div className="image-container">
          <img src={`https://e-commerce-six-pink.vercel.app/${imagePath}`} alt="product image" />
        </div>
        <div className="Singleprod-info">
          <h1>{title}</h1>
          <h2>${price}</h2>
          <select>
            <option>Select Size</option>
            <option>XL</option>
            <option>XXL</option>
            <option>Small</option>
            <option>Large</option>
          </select>
          <div className="prod-buttons">
            <div>
              
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="buttons">
              <button onClick={() => handleQuantity("inc")}>
                
                <AiOutlinePlus />
              </button>
              <button onClick={() => handleQuantity("dec")}>
                
                <IoIosRemove />
              </button>
            </div>
          </div>
          {user && !user.isAdmin && (
            <div className="format-btn">
              <Link to={`/product/${_id}/edit`}>
                <button style={{ marginRight: "1rem" }}>Edit Product</button>
              </Link>

              <button style={{ marginRight: "1rem" }} onClick={toggleModal}>
                Delete Product
              </button>

              {modal && <Modal setModal={setModal} id={_id} />}
            </div>
          )}
          <button className="cart-button" onClick={addToCart}>
            ADD TO CART
          </button>
          <h4>Product Details</h4>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProd;
