import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { SidebarData } from "../../Data/Data.jsx";
import "./sidebar.css";


const Sidebar = ({isOpen}) => {
  return (
    <div className='side-container'>
      <section className={isOpen ? "menu active" : "menu"}>
        <div className="logo">
          <h2>T-R</h2>
        </div>
          <div className="items">
            {SidebarData.map((item, index) => {
            return (
              <div
                key={index}
    
              >
                <li>
                  
                    <item.icon className="icon" />
                    <Link to={item.link}>{item.heading}</Link>
                  
                </li>
              </div>
            );
          })}
          </div>
          
      </section>
    </div>
  )
};

export default Sidebar;

// const Sidebar = () => {
//   const [selected, setSelected] = useState(0);
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <div className="side-container">
//       <div className="sidebar">
//         <div className="top-section">
//           <h1 className="logo">TR-STORES</h1>
//           <div className="bars">
//             <FaBars  />
//           </div>
//         </div>

//         <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//         <ul className="nav-list" onClick={showSidebar}>
//           {SidebarData.map((item, index) => {
//             return (
//               <div
//                 key={index}
//                 className={
//                   selected === index ? "menu-item active" : "menu-item"
//                 }
//                 onClick={() => setSelected(index)}
//               >
//                 <li>
//                   <Link to={item.link}>
//                     <item.icon className="icon" />
//                     <span className="link-text">{item.heading}</span>
//                   </Link>
//                 </li>
//               </div>
//             );
//           })}
//           <div className="menu-item">
//         <BiLogOut />
//       </div>
//         </ul>
//         </nav>
//       </div>
      
//     </div>
//   );
// };


