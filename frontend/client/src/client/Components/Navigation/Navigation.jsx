/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navigation = () => {
  const [Mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const cart = useSelector((state) => state.cart.cart);

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
            {/*{!user && (*/}
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/*)}*/}

            {/*{user && user.isAdmin && (*/}
            <>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/new-product">Create Product</Link>
              </li>
            </>
            {/*)}*/}

            {/*{user && !user.isAdmin && (*/}
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/orders">My Orders</Link>
              </li>
              <Link>
                <button>Logout</button>
              </Link>
            </>
            {/*)}*/}
          </ul>
        </div>
        <div>
          <button
            className="mobile-menu-icon"
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
