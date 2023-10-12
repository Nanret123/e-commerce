/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import "./Navigation.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navigation = () => {
  const [Mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = Boolean(useSelector((state) => state.auth.token));

   const handleLogout = () => {
    dispatch(setLogout());
   }


  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="logo">
          <h2>Stores</h2>
        </Link>

        <div>
          <ul
            className={Mobile ? "nav-links-mobile" : "nav-links"}
            onClick={() => setMobile(false)}
          >
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              
            </>
            )}
           {user && !user.isAdmin && (
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/orders">My Orders</Link>
              </li>
              
            </>
            )}
          
          {user && !user.isAdmin && (
            <>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/newProduct">Create Product</Link>
              </li>
            </>
            )} 
            {user && (
               
                <Link>
                <button onClick={handleLogout}>Logout</button>
              </Link>
               
              )}
           
          </ul>
        </div>
        <div className="mobile-menu-icon">
          <button
            
            onClick={() => setMobile(!Mobile)}
          >
            {Mobile ? <ImCross /> : <FaBars />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
