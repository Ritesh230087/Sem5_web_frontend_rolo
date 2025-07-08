import {
  getAllProductsApi,
  getProductByIdApi,
  getFeaturedProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/productApi";

export async function fetchProducts() {
  const res = await getAllProductsApi();
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data || [];
}

export async function fetchProductById(id) {
  const res = await getProductByIdApi(id);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data.data;
}

export async function fetchFeaturedProducts() {
  const res = await getFeaturedProductsApi();
  if (!res.ok) throw new Error("Failed to fetch featured products");
  const data = await res.json();
  return data.data || [];
}

export async function createProduct(product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("crossedPrice", product.crossedPrice);
  formData.append("originalPrice", product.originalPrice);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("categoryId", product.categoryId);
  if (product.ribbonId) formData.append("ribbonId", product.ribbonId);
  formData.append("featured", product.featured ? "true" : "false");

  // Auto-calculate youSave and discountPercent
  const price = parseFloat(product.price);
  const originalPrice = parseFloat(product.originalPrice);
  const youSave = originalPrice - price;
  const discountPercent = ((youSave / originalPrice) * 100).toFixed(2);

  formData.append("youSave", youSave.toString());
  formData.append("discountPercent", discountPercent.toString());

  if (product.image) {
    formData.append("image", product.image);
  }

  const res = await createProductApi(formData);
  if (!res.ok) throw new Error("Failed to create product");
  return await res.json();
}

export async function updateProduct(id, product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("crossedPrice", product.crossedPrice);
  formData.append("originalPrice", product.originalPrice);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("categoryId", product.categoryId);
  if (product.ribbonId) formData.append("ribbonId", product.ribbonId);
  formData.append("featured", product.featured ? "true" : "false");

  // Auto-calculate youSave and discountPercent
  const price = parseFloat(product.price);
  const originalPrice = parseFloat(product.originalPrice);
  const youSave = originalPrice - price;
  const discountPercent = ((youSave / originalPrice) * 100).toFixed(2);

  formData.append("youSave", youSave.toString());
  formData.append("discountPercent", discountPercent.toString());

  if (product.image) {
    formData.append("image", product.image);
  }

  const res = await updateProductApi(id, formData);
  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
}

export async function deleteProduct(id) {
  const res = await deleteProductApi(id);
  if (!res.ok) throw new Error("Failed to delete product");
  return await res.json();
}
