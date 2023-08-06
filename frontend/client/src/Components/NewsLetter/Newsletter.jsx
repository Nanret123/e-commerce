import React from 'react';
import "./Newsletter.css";

const Newsletter = () => {
	return (
		<div className="news-container">
			<h2>Newsletter</h2>
			<div className="news-desc">
				Welcome to Our Community!
			</div>
			<div className="input-container">
				<input type="text" placeholder="Your Email..." />
				<button>Send</button>
			</div>
		</div>
	)
}

export default Newsletter