import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart);

const Header = ({ cartItems, totalOrder, location }) => {
  return (
    <header className="Header">
      <nav className="navbar navbar-dark bg-dark">
        {location.pathname !== "/" ? (
          <Link className="navbar-brand" to="/">
            Bookstore App
          </Link>
        ) : (
          <div className="navbar-brand">Bookstore App</div>
        )}
        <div className="cart">
          <FontAwesomeIcon icon="shopping-cart" />
          <Link to="/cart" className="cart-info">
            {cartItems} items (${totalOrder})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
