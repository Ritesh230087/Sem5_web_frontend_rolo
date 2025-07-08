import "../../styles/globals.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../services/admin/categoryService";

const Header = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCollections(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/">
            <img src="/images/Rolo Logo.jpeg" alt="Rolo Nepal" className="logo" />
          </Link>

          <nav className="nav-desktop">
            {/* Dropdown for Collections */}
            <div className="dropdown">
              <span className="nav-link">Collections</span>
              <div className="dropdown-menu">
                {collections.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category._id}`}
                    className="dropdown-item"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="#" className="nav-link">Bags</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="nav-icons">
            <button className="icon-button">🔍</button>
            <button className="icon-button">👤</button>
            <button className="icon-button">🛒</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;