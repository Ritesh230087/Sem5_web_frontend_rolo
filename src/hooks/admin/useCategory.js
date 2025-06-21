import { useState, useEffect } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategoryById,
} from "../../api/categoryApi";

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Add category
  const addCategory = async (category) => {
    try {
      setLoading(true);
      await createCategory(category);
      await loadCategories();
    } catch (err) {
      setError(err.message || "Error creating category");
    } finally {
      setLoading(false);
    }
  };

  // Edit category
  const editCategory = async (id, category) => {
    try {
      setLoading(true);
      await updateCategory(id, category);
      await loadCategories();
    } catch (err) {
      setError(err.message || "Error updating category");
    } finally {
      setLoading(false);
    }
  };

  // Remove category
  const removeCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategory(id);
      await loadCategories();
    } catch (err) {
      setError(err.message || "Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  // Fetch one category details (for view/edit)
  const getCategoryById = async (id) => {
    try {
      setLoading(true);
      const category = await fetchCategoryById(id);
      return category;
    } catch (err) {
      setError(err.message || "Error fetching category");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
    getCategoryById,
  };
}

