import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../services/admin/categoryService";
import { getCartCount } from "../../services/cartService";
import "../../styles/globals.css";

const Header = () => {
  const [collections, setCollections] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCategories()
      .then(setCollections)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setCartCount(getCartCount());

    const onCartUpdated = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    return () => window.removeEventListener("cartUpdated", onCartUpdated);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/">
            <img src="/images/Rolo Logo.jpeg" alt="Rolo Nepal" className="logo" />
          </Link>

          <nav className="nav-desktop">
            <div className="dropdown">
              <span className="nav-link">Collections</span>
              <div className="dropdown-menu">
                {collections.map((category) => (
                  <Link key={category._id} to={`/products/${category._id}`} className="dropdown-item">
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/products" className="nav-link">
              Discover Rolo
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          <div className="nav-icons">
            <button className="icon-button">🔍</button>
            <button className="icon-button">👤</button>

            <Link to="/cart" className="icon-button cart-icon" aria-label="Cart">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

