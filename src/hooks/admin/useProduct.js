import { useState, useEffect } from "react";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/admin/productService";

export function useProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct: async (form) => {
      await createProduct(form);
      await loadProducts();
    },
    editProduct: async (id, form) => {
      await updateProduct(id, form);
      await loadProducts();
    },
    removeProduct: async (id) => {
      await deleteProduct(id);
      await loadProducts();
    },
    getProductById: fetchProductById,
  };
}
