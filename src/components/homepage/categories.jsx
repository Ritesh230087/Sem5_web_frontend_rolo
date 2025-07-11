import "../../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const categories = [
    { name: "Rolo Laptop Bag", description: "Inspired by Nepalses Culture", image: "/images/rolo laptop bag.png", badge: "New" },
    { name: "Rolo Backpacks", description: "Inspired by Nepalses Culture", image: "/images/rolo black bag.png", badge: "Best Seller" },
    { name: "Rolo Tote Bag", description: "Inspired by Nepalses Culture", image: "/images/rolo tote bag.jpeg", badge: "Limited" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            categories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="categories">
      <h2 className="categories-title">
        Sacred <span className="categories-title-bold">Collections</span>
      </h2>
      <div ref={sectionRef} className="categories-grid">
        {categories.map((category, index) => (
          <Link key={index} to="#" className={`category-card ${visibleItems.includes(index) ? "animate-in" : ""}`}>
            <div className="category-image-container">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="category-image"
              />
              <div className="category-image-overlay" />
            </div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              {category.badge && <div className="category-ribbon">{category.badge}</div>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
