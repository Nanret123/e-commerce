import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import loungewear from "/images/loungewear.jpg";
import "./Header.css";

const Header = ({activateNav, isOpen}) => {
   
  return (
    <div className="main-content">
      <div className={isOpen ? "header-wrapper" : "header-wrapper main"}>
        <div className="header-first">
          <FaBars className="bars" onClick={activateNav} />
          <div className="header-title">
          <span>Primary</span>
          <h2>Dashboard</h2>
        </div>
        </div>
        
        <div className="user-info">
          <div className="search-box">
            <BsSearch className="search" />
            <input type="text" placeholder="search" />
          </div>
          <img src={loungewear} alt="user-img" />
        </div>
      </div>
    </div>
  );
};

export default Header;
