import React, { useRef } from "react";
import { flyProductImage } from "../utils/flyProductImage";
import { incrementCartCount } from "../services/cartService";

export default function ProductCard({ product, cartIconRef }) {
  const imageRef = useRef(null);

  const handleAddToCart = () => {
    if (imageRef.current && cartIconRef?.current) {
      flyProductImage(imageRef.current, cartIconRef.current);
    }
    incrementCartCount(1);
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        ref={imageRef}
        style={{ width: "150px", height: "150px", borderRadius: "8px" }}
      />
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
