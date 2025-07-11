import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/admin/categoryService";

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load all categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category) => {
    await createCategory(category);
    await loadCategories();
  };

  const editCategory = async (id, category) => {
    await updateCategory(id, category);
    await loadCategories();
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    await loadCategories();
  };

  const getCategoryById = async (id) => {
    return await fetchCategoryById(id);
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

