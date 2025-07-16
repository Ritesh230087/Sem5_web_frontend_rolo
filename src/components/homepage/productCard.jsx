
import React from "react";
import { useNavigate } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/backend-image";
import "../../styles/globals.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, price, originalPrice, filepath, ribbonId, _id } = product;
  const imageUrl = getBackendImageUrl(filepath);

  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="product-card animate-in">
      {/* Ribbon Badge */}
      {ribbonId?.label && (
        <span
          className="product-badge"
          style={{ backgroundColor: ribbonId.color }}
        >
          {ribbonId.label}
        </span>
      )}

      <div className="product-image-container">
        <img
          src={imageUrl}
          alt={name}
          className="product-image"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="product-image-overlay" />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-name">{name}</h3>

        <div className="product-pricing">
          <div className="product-price">
            <div className="product-currency">NPR</div>
            <div className="product-amount">{price.toLocaleString()}</div>
          </div>
          {originalPrice > price && (
            <span className="product-original-price">
              NPR {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          className="product-floating-button"
          onClick={() => navigate(`/product/${_id}`)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;