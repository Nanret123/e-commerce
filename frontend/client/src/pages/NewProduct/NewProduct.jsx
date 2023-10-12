import React, { useState } from "react";
import "./NewProduct.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../state/index.jsx";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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

  const handleSubmit = async (e) => {
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

    const response = await fetch(`http://localhost:8080/newProduct`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const products = await response.json();
    dispatch(setItems({ items: products }));
    setFile(null);
    navigate(`/home`);
  };

  return (
    <div className="form-section">
      <div className="form-div">
        <header>Product Form</header>
        <form
          action=""
          className="form"
          onSubmit={handleSubmit}
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
          <button onSubmit={handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
