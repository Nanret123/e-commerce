import React, { useState } from "react";
import "./EditProduct.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../state/index.jsx";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.auth.items.find((data) => data._id === id)
  );
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.auth.items);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setIsSuccess(false);

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile?.type)) {
      setIsError(true);
      setErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
      return;
    }
    setIsError(false);
    setFile(selectedFile);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !file) {
      setIsError(true);
      setErrorMsg("Please fill all the required details");
      return;
    }
    setIsError(false);
    setIsSuccess(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("price", price);

    const response = await fetch(`https://e-commerce-azure-six.vercel.app/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const products = await response.json();
    dispatch(setItems({ items: products }));
    setFile(null);
    navigate(`/product/${id}`);
  };

  return (
    <div className="form-section">
      <div className="form-div">
        <header>Product Form</header>
        <form
          action=""
          className="form"
          onSubmit={handleEdit}
          encType="multipart/form-data"
        >
          <div className="form-wrapper">
            <div className="input-box">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="description">Product Description</label>
              <textarea
                name="description"
                id=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="price">Product Price($)</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="image">Product Image</label>
              <input type="file" name="image" onChange={handleFileChange} />
            </div>
            {isError && <p>{errorMsg}</p>}
          </div>
          <button onSubmit={handleEdit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
