import React from "react";
import { BiDollar } from "react-icons/bi";

const Card = ({ title, number, Oicon, detail }) => {
  return (
    <div className="payment-card">
    <div className="dollar">{Oicon}</div>
        <div>
          <h3>{number}</h3>
          <span>{title}</span>
        </div>
        
      </div>
  );
};

export default Card;
