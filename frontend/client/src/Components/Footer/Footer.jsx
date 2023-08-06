import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-row">
					<div className="footer-col">
						<h4>Company</h4>
						<ul>
							<li><a href="">about us</a></li>
							<li><a href="">our services</a></li>
              <li><a href="">privacy policy</a></li>
              <li><a href="">affiliate programme</a></li>

						</ul>
					</div>
						<div className="footer-col">
						<h4>Get Help</h4>
						<ul>
							<li><a href="">FAQ</a></li>
							<li><a href="">shipping</a></li>
              <li><a href="">returns</a></li>
              <li><a href="">order status</a></li>
              <li><a href="">payment option</a></li>
						</ul>
					</div>
						<div className="footer-col">
						<h4>Online Shop</h4>
						<ul>
							<li><a href="">watch</a></li>
							<li><a href="">bags</a></li>
							<li><a href="">shoes</a></li>
							<li><a href="">dress</a></li>
						</ul>
					</div>
					<div className="footer-col">
						<h4>Follow us</h4>
						<div className="social-links">
							<a href=""><FaFacebookF /></a>
							<a href=""><BsInstagram /></a>
							<a href=""><AiOutlineTwitter /></a>
							<a href=""><FaTiktok /></a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer