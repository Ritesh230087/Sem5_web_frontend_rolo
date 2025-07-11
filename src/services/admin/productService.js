
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
  // API returns array directly, so return data itself
  return Array.isArray(data) ? data : [];
}


export async function fetchProductById(id) {
  const res = await getProductByIdApi(id);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data;  // return the product object directly
}


export async function fetchFeaturedProducts() {
  const res = await getFeaturedProductsApi();
  if (!res.ok) throw new Error("Failed to fetch featured products");
  const data = await res.json();
  return Array.isArray(data) ? data : []; 
}

export async function createProduct(product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("originalPrice", product.originalPrice);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("categoryId", product.categoryId);
  if (product.ribbonId) formData.append("ribbonId", product.ribbonId);
  formData.append("featured", product.featured ? "true" : "false");

  const youSave = product.originalPrice - product.price;
  const discountPercent = ((youSave / product.originalPrice) * 100).toFixed(2);
  formData.append("youSave", youSave.toString());
  formData.append("discountPercent", discountPercent.toString());

  if (product.image) {
    formData.append("image", product.image);
  }

  // ✅ FIXED: Send features as JSON string
  if (product.features && product.features.length > 0) {
    formData.append("features", JSON.stringify(product.features));
  }

  if (product.material) formData.append("material", product.material);
  if (product.origin) formData.append("origin", product.origin);
  if (product.care) formData.append("care", product.care);
  if (product.warranty) formData.append("warranty", product.warranty);

  // ✅ FIXED: Append each file under the same key "extraImages"
  if (product.extraImages && product.extraImages.length > 0) {
    product.extraImages.forEach((img) => formData.append("extraImages", img));
  }

  const res = await createProductApi(formData);
  if (!res.ok) throw new Error("Failed to create product");
  return await res.json();
}

export async function updateProduct(id, product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("originalPrice", product.originalPrice);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("categoryId", product.categoryId);
  if (product.ribbonId) formData.append("ribbonId", product.ribbonId);
  formData.append("featured", product.featured ? "true" : "false");

  const youSave = product.originalPrice - product.price;
  const discountPercent = ((youSave / product.originalPrice) * 100).toFixed(2);
  formData.append("youSave", youSave.toString());
  formData.append("discountPercent", discountPercent.toString());

  if (product.image) {
    formData.append("image", product.image);
  }

  // ✅ FIXED
  if (product.features && product.features.length > 0) {
    formData.append("features", JSON.stringify(product.features));
  }

  if (product.material) formData.append("material", product.material);
  if (product.origin) formData.append("origin", product.origin);
  if (product.care) formData.append("care", product.care);
  if (product.warranty) formData.append("warranty", product.warranty);

  if (product.extraImages && product.extraImages.length > 0) {
    product.extraImages.forEach((img) => formData.append("extraImages", img));
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

