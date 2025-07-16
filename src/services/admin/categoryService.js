import {
  getAllCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../api/categoryApi";


export async function fetchCategories() {
  const response = await getAllCategoriesApi();
  return response.data.data || [];
}


export async function fetchCategoryById(id) {
  const response = await getCategoryByIdApi(id);
  return response.data.data;
}

/**
 * @param {object} category 
 */
export async function createCategory(category) {
  const formData = new FormData();
  formData.append("name", category.name);
  if (category.image) {
    formData.append("image", category.image[0] || category.image);
  }

  const response = await createCategoryApi(formData);
  return response.data;
}

/**
 * @param {string} id 
 * @param {object} category 
 */
export async function updateCategory(id, category) {
  const formData = new FormData();
  formData.append("name", category.name);
  if (category.image && category.image.length > 0) {
    formData.append("image", category.image[0]);
  }

  const response = await updateCategoryApi(id, formData);
  return response.data;
}

/**
 * @param {string} id 
 */
export async function deleteCategory(id) {
  const response = await deleteCategoryApi(id);
  return response.data;
}