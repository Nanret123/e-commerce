/* eslint-disable no-unused-vars */
import React, { useState }  from "react";
import { BiWallet } from "react-icons/bi";
import { BsClipboard } from "react-icons/bs";
import { FaUsers, FaBars } from "react-icons/fa";
import { AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/Header/Header.jsx";
import Cards from "../../components/cards/Cards.jsx";
import Table from "../../components/Table/Table.jsx";
import "./AdminDashboard.css";

const AdminDashboard = () => {
   const [isOpen, setIsOpen] = useState(false);
   
    const activateNav= () => {
        return setIsOpen(!isOpen);
    };

  return (
    <div className="app">
       <div className="admin-body">
          <Sidebar isOpen={isOpen}/>
          <div className={isOpen ? "main-active" : "main"}>
            <Header activateNav={activateNav} isOpen={isOpen} />
            <div className="sub-main">
            <Cards />
            <Table /> 
            </div>
           
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
