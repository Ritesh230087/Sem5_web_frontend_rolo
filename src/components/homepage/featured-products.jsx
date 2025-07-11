
import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../../services/admin/productService";
import ProductCard from "./productCard";
import "../../styles/globals.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts()
      .then((data) => {
        console.log("Fetched featured products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);
  useEffect(() => {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => card.classList.add("animate-in"));
  }, [products]);

  if (products.length === 0) return null;

  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="featured-title">
          Heritage <span className="featured-title-bold">Masterpieces</span>
        </h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
