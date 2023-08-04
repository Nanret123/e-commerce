import React from "react";
import { BiDollar } from "react-icons/bi";
import "./Cards.css";
import { cardsData } from "../../Data/Data.jsx";
import Card from "./Card.jsx";

const Cards = () => {
  return (
  		
  		<div className="card-container">
      <h3 className="main-title">Today&apos;s data</h3>
      <div className="card-wrapper">
      	{cardsData.map((card, index) => {
        return (
          <div  key={index}>
            <Card {...card} Oicon={<card.icon />} />
          </div> 
        );
      })}
      </div>
      
    </div>
    
  );
};

export default Cards;
