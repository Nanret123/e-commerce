import React from 'react';
import summer from "/images/summer.jpg";
import "./Hero.css";

const SliderHome = () => {
    return ( 
    	<>
        <main className="main-container">
			  <img src={summer} alt="summer" />
				<div className="main-text">
							<h5>Summer Collection</h5>
							<h1>New Summer <br /> Collection</h1>
							<p>There's nothing like this</p>
							<button className="btn">Discover More</button>
						</div>
				</main> 
			</>
    )
}

export default SliderHome;