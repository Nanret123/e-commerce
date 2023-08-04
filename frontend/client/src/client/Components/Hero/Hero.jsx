import React from 'react';
import autumn from "../../images/autumn.jpeg";
import "./Hero.css";

const SliderHome = () => {
    return ( 
    	<>
        <main className="main-container">
			  <img src={autumn} alt="" />
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