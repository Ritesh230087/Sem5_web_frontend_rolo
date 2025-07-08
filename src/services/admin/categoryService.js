import {
  getAllCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../api/categoryApi";

export async function fetchCategories() {
  const res = await getAllCategoriesApi();
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data || [];
}

export async function fetchCategoryById(id) {
  const res = await getCategoryByIdApi(id);
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  return data.data;
}

export async function createCategory(category) {
  const formData = new FormData();
  formData.append("name", category.name);
  if (category.image) formData.append("image", category.image);

  const res = await createCategoryApi(formData);
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
}

export async function updateCategory(id, category) {
  const formData = new FormData();
  formData.append("name", category.name);
  if (category.image) formData.append("image", category.image);

  const res = await updateCategoryApi(id, formData);
  if (!res.ok) throw new Error("Failed to update category");
  return await res.json();
}

export async function deleteCategory(id) {
  const res = await deleteCategoryApi(id);
  if (!res.ok) throw new Error("Failed to delete category");
  return await res.json();
}
