const API_BASE = "http://localhost:5050/api/admin/category";

export async function fetchCategories() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data || [];
}

export async function fetchCategoryById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  return data.data;
}

export async function createCategory(category) {
  const formData = new FormData();
  formData.append("name", category.name);
  if (category.image) formData.append("image", category.image);

  const res = await fetch(`${API_BASE}/create`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
}

export async function updateCategory(id, category) {
  const formData = new FormData();
  formData.append("name", category.name);
  if (category.image) formData.append("image", category.image);

  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update category");
  return await res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
  return await res.json();
}
