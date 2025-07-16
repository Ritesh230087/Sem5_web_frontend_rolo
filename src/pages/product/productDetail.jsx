import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../services/admin/productService";
import { getBackendImageUrl } from "../../utils/backend-image";
import { addToCart, incrementCartCount } from "../../services/cartService";
import "../../styles/productDetail.css";
import { flyProductImageFromButtonToCart } from "../../utils/flyProductImage";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [availableQty, setAvailableQty] = useState(0);

  const isLoggedIn = !!localStorage.getItem("user");

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);

      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartItem = cartItems.find((item) => item.id === data._id);
      const cartQty = cartItem ? cartItem.quantity : 0;

      const quantityLeft = data.quantity - cartQty;
      setAvailableQty(quantityLeft);
      setQuantity(quantityLeft > 0 ? 1 : 0);
    });
  }, [id]);

  useEffect(() => {
    const updateAvailableQtyFromCart = () => {
      if (!product) return;
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartItem = cartItems.find((item) => item.id === product._id);
      const cartQty = cartItem ? cartItem.quantity : 0;
      const newAvailableQty = Math.max(product.quantity - cartQty, 0);
      setAvailableQty(newAvailableQty);

      setQuantity((q) => (q > newAvailableQty ? newAvailableQty : (newAvailableQty > 0 ? q : 0)));
    };

    window.addEventListener("cartUpdated", updateAvailableQtyFromCart);
    return () => window.removeEventListener("cartUpdated", updateAvailableQtyFromCart);
  }, [product]);

  const handleAddToCart = (e) => {
    if (!isLoggedIn) {
      alert("Please log in to add products to cart.");
      navigate("/login");
      return;
    }

    if (quantity > availableQty || availableQty === 0) return;

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: getBackendImageUrl(product.filepath),
    });

    window.dispatchEvent(new Event("cartUpdated"));

    setQuantity(1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    incrementCartCount(quantity);

    const addToCartButton = e.currentTarget;
    const cartIcon = document.querySelector(".cart-icon");
    const detailContainer = addToCartButton.closest(".detail-container");
    const productImage = detailContainer?.querySelector(".main-image");

    if (addToCartButton && cartIcon && productImage) {
      flyProductImageFromButtonToCart(addToCartButton, productImage, cartIcon);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Please log in to purchase this product.");
      navigate("/login");
      return;
    }

    if (quantity > availableQty || availableQty === 0) return;

    navigate("/buy-now", {
      state: { product, quantity },
    });
  };

  if (!product) return <div className="product-detail">Loading...</div>;

  const images = [
    getBackendImageUrl(product.filepath),
    ...(product.images || []).map(getBackendImageUrl),
  ];

  const youSave = product.originalPrice - product.price;
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const toggleZoom = (e) => {
    if (!modalZoom) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const xPercent = ((offsetX / rect.width) * 100).toFixed(2);
      const yPercent = ((offsetY / rect.height) * 100).toFixed(2);
      setTransformOrigin(`${xPercent}% ${yPercent}%`);
    } else {
      setTransformOrigin("center center");
    }
    setModalZoom((z) => !z);
  };

  return (
    <div className="product-detail">
      <div className="detail-container">
        <div className="image-section">
          <button onClick={() => navigate("/products")} className="back-to-products">
            ← Back to Products
          </button>

          <div
            className="main-image-container"
            onClick={() => {
              setModalOpen(true);
              setModalZoom(false);
              setTransformOrigin("center center");
            }}
          >
            <img src={images[selectedImage]} alt={product.name} className="main-image" />
            {product.ribbon && (
              <div className="image-badge" style={{ background: product.ribbon.color }}>
                {product.ribbon.label || product.ribbon.name}
              </div>
            )}
          </div>

          <div className="thumbnail-grid">
            {images.map((img, i) => (
              <button
                key={i}
                className={`thumbnail ${i === selectedImage ? "active" : ""}`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt={`View ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h1 className="product-title">
            {product.name}
            {product.ribbon && (
              <span className="inline-ribbon" style={{ backgroundColor: product.ribbon.color }}>
                {product.ribbon.label || product.ribbon.name}
              </span>
            )}
          </h1>

          <div className="pricing-section">
            <span className="current-price">NPR {product.price.toLocaleString()}</span>
            <span className="original-price">NPR {product.originalPrice.toLocaleString()}</span>
            <span className="discount">{discountPercent}% OFF</span>
          </div>

          <div className="save-qty-row">
            <div className={`you-save ${availableQty === 0 ? "out-of-stock" : ""}`}>
              You Save: NPR {youSave.toLocaleString()}
            </div>
            <div className={`available-qty ${availableQty === 0 ? "out-of-stock" : ""}`}>
              Available Quantity: {availableQty}
            </div>
          </div>

          <div className="description">
            <p>{product.description}</p>
          </div>

          <div className="features-section">
            <h3>Key Features</h3>
            <div className="features-grid">
              {product.features?.map((f, i) => (
                <div className="feature-item" key={i}>
                  <span className="feature-icon">✓</span> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={availableQty === 0 || quantity <= 1}
                >
                  −
                </button>
                <span className="quantity">{availableQty === 0 ? 0 : quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={availableQty === 0 || quantity >= availableQty}
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className={`add-to-cart-btn ${addedToCart ? "added" : ""}`}
                onClick={handleAddToCart}
                disabled={availableQty === 0}
              >
                {availableQty === 0
                  ? "Out of Stock"
                  : addedToCart
                  ? "✓ Added to Cart!"
                  : "Add to Cart"}
              </button>
              <button
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={availableQty === 0}
              >
                Buy Now
              </button>
            </div>
          </div>

          <div className="product-details">
            <div className="detail-item">
              <strong>Material:</strong> {product.material}
            </div>
            <div className="detail-item">
              <strong>Origin:</strong> {product.origin}
            </div>
            <div className="detail-item">
              <strong>Care:</strong> {product.care}
            </div>
            <div className="detail-item">
              <strong>Warranty:</strong> {product.warranty}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="image-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setModalOpen(false)}>
              ×
            </button>
            <img
              src={images[selectedImage]}
              alt="Zoomed"
              className={modalZoom ? "zoomed" : ""}
              onClick={toggleZoom}
              style={{ cursor: modalZoom ? "zoom-out" : "zoom-in", transformOrigin }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
