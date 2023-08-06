import React from 'react';
import Hero from  "../../Components/Hero/Hero.jsx";
import Category from "../../Components/Category/Category.jsx";
import ProductList from "../../Components/Products/ProductList.jsx";
import NewsLetter from "../../Components/NewsLetter/Newsletter.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Navigation from "../../Components/Navigation/Navigation.jsx";

const Home = () => {
	return (
		<>
		
			<section className="home">
			<div className="container">
        <Hero />
				<Category/>
				<ProductList />
        <NewsLetter />
        <Footer />
			</div>
				

			</section>
		</>
	)
}

export default Home