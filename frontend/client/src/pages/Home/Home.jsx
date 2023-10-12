import React, { useEffect } from "react";
import Hero from "../../Components/Hero/Hero.jsx";
import ProductList from "../../Components/Products/ProductList.jsx";
import NewsLetter from "../../Components/NewsLetter/Newsletter.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Navigation from "../../Components/Navigation/Navigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setError } from "../../state";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.auth.items);
  const error = useSelector((state) => state.auth.error);

  const getItems = async () => {
    try {
      const products = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await products.json();
      dispatch(setItems({ items: data }));
    } catch (error) {
      setError({ error: error });
      navigate("/error");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <section className="home">
        <div className="container">
          <Hero />
          <ProductList items={items} />
          <NewsLetter />
          <Footer />
        </div>
      </section>{" "}
    </>
  );
};

export default Home;
