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
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const responseData = await res.json();
  
  if (responseData && Array.isArray(responseData.data)) {
    return responseData.data;
  }
  
  return []; 
}

export async function fetchProductById(id) {
  const res = await getProductByIdApi(id);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const responseData = await res.json();

  return responseData.data;
}

export async function fetchFeaturedProducts() {
  const res = await getFeaturedProductsApi();
  if (!res.ok) {
    throw new Error("Failed to fetch featured products");
  }
  const responseData = await res.json();
  
  if (responseData && Array.isArray(responseData.data)) {
    return responseData.data;
  }
  
  return []; 
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

  if (product.image) {
    formData.append("image", product.image[0]); 
  }

  const res = await createProductApi(formData);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create product");
  }
  return await res.json();
}

export async function updateProduct(id, product) {
    const formData = new FormData();
    Object.keys(product).forEach(key => {
        if (key === 'image' && product.image && product.image.length > 0) {
            formData.append('image', product.image[0]);
        } else if (product[key] !== null && product[key] !== undefined) {
            formData.append(key, product[key]);
        }
    });

    const res = await updateProductApi(id, formData);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update product");
    }
    return await res.json();
}

export async function deleteProduct(id) {
  const res = await deleteProductApi(id);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete product");
  }
  return await res.json();
}