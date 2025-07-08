// import { useState, useEffect } from "react";
// import {
//   fetchCategories,
//   createCategoryApi,
//   updateCategory,
//   deleteCategoryApi,
//   fetchCategoryById,
// } from "../../services/admin/categoryService";

// export function useCategory() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch categories
//   const loadCategories = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchCategories();
//       setCategories(data);
//     } catch (err) {
//       setError(err.message || "Error loading categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   // Add category
//   const addCategory = async (category) => {
//     try {
//       setLoading(true);
//       await createCategoryApi(category);
//       await loadCategories();
//     } catch (err) {
//       setError(err.message || "Error creating category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit category
//   const editCategory = async (id, category) => {
//     try {
//       setLoading(true);
//       await updateCategory(id, category);
//       await loadCategories();
//     } catch (err) {
//       setError(err.message || "Error updating category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove category
//   const removeCategory = async (id) => {
//     try {
//       setLoading(true);
//       await deleteCategoryApi(id);
//       await loadCategories();
//     } catch (err) {
//       setError(err.message || "Error deleting category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch one category details (for view/edit)
//   const getCategoryById = async (id) => {
//     try {
//       setLoading(true);
//       const category = await fetchCategoryById(id);
//       return category;
//     } catch (err) {
//       setError(err.message || "Error fetching category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     categories,
//     loading,
//     error,
//     addCategory,
//     editCategory,
//     removeCategory,
//     getCategoryById,
//   };
// }

















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

