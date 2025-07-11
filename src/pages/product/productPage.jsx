import React, { useEffect, useState } from "react";
import Header from "../../components/homepage/header";
import Footer from "../../components/homepage/footer";
import ProductCard from "../../components/homepage/productCard";
import { fetchProducts } from "../../services/admin/productService";
import { useParams } from "react-router-dom";
import "../../styles/globals.css"; 
import "../../styles/productPage.css"; 

export default function ProductPage() {
  const { categoryId } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [activePrice, setActivePrice] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(5000); 

  useEffect(() => {
    const load = async () => {
      const res = await fetchProducts();
      setAllProducts(res);
    };
    load();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    if (categoryId) {
      products = products.filter(p => p.categoryId?._id === categoryId);
    }

    if (search) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (activePrice === "under3k") {
      products = products.filter(p => p.price < 3000);
    } else if (activePrice === "3kto5k") {
      products = products.filter(p => p.price >= 3000 && p.price <= 5000);
    } else if (activePrice === "above5k") {
      products = products.filter(p => p.price > 5000);
    }

    if (selectedPrice < 5000) {
      products = products.filter(p => p.price <= selectedPrice);
    }

    if (sort === "lowtohigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "hightolow") {
      products.sort((a, b) => b.price - a.price);
    }

    setFiltered(products);
  }, [allProducts, categoryId, search, sort, activePrice, selectedPrice]);

  const handlePriceChange = (e) => {
    setSelectedPrice(parseInt(e.target.value));
  };

  return (
    <>
      <Header />
      <div className="product-page-container">
        <div className="product-sidebar">
          <input
            className="product-search"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="lowtohigh">Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
          </select>

          <div className="price-filter">
            <h3>Price Range</h3>
            <input
              type="range"
              className="price-slider"
              min="0"
              max="10000"
              value={selectedPrice}
              onChange={handlePriceChange}
            />
            <div className="price-labels">
              <span>NPR 0</span>
              <span>NPR {selectedPrice.toLocaleString()}</span>
            </div>

            <div className="price-buttons">
              <button
                className={activePrice === "under3k" ? "active" : ""}
                onClick={() => setActivePrice("under3k")}
              >
                Under 3K
              </button>
              <button
                className={activePrice === "3kto5k" ? "active" : ""}
                onClick={() => setActivePrice("3kto5k")}
              >
                3K - 5K
              </button>
              <button
                className={activePrice === "above5k" ? "active" : ""}
                onClick={() => setActivePrice("above5k")}
              >
                Above 5K
              </button>
              
              <button
                className={activePrice === "all" ? "active" : ""}
                onClick={() => setActivePrice("all")}
              >
                All
              </button>
            </div>
          </div>
        </div>

        <div className="product-grid">
          {filtered.length === 0 ? (
            <div className="no-products">No products found</div>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
