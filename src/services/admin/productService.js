import {
  getAllProductsApi,
  getProductByIdApi,
  getFeaturedProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/productApi"; 

export async function fetchProducts() {
  const response = await getAllProductsApi();
  return response.data.data || [];
}

export async function fetchProductById(id) {
  const response = await getProductByIdApi(id);
  return response.data.data;
}

export async function fetchFeaturedProducts() {
  const response = await getFeaturedProductsApi();
  return response.data.data || [];
}

export async function createProduct(product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("originalPrice", product.originalPrice);
  formData.append("quantity", product.quantity);
  formData.append("categoryId", product.categoryId);
  if (product.ribbonId) formData.append("ribbonId", product.ribbonId);
  formData.append("featured", product.featured ? "true" : "false");
  if (product.material) formData.append("material", product.material);
  if (product.origin) formData.append("origin", product.origin);
  if (product.care) formData.append("care", product.care);
  if (product.warranty) formData.append("warranty", product.warranty);
  if (product.features && product.features.length > 0) {
    formData.append("features", JSON.stringify(product.features));
  }
  if (product.image) {
    formData.append("image", product.image);
  }
  if (product.extraImages && product.extraImages.length > 0) {
    product.extraImages.forEach((file) => {
      formData.append("extraImages", file);
    });
  }

  const response = await createProductApi(formData);
  return response.data;
}

export async function updateProduct(id, product) {
    const formData = new FormData();
    // ... this FormData creation logic is also correct and remains unchanged ...
    Object.keys(product).forEach(key => {
        if (key === 'image' || key === 'extraImages' || key === 'features') return;
        const value = product[key];
        if (value !== null && value !== undefined) {
            if (typeof value === 'boolean') {
                formData.append(key, value ? 'true' : 'false');
            } else {
                formData.append(key, value);
            }
        }
    });
    if (product.features) {
        formData.append('features', JSON.stringify(product.features));
    }
    if (product.image) {
        formData.append('image', product.image);
    }
    if (product.extraImages && product.extraImages.length > 0) {
        product.extraImages.forEach(file => {
            formData.append('extraImages', file);
        });
    }

    const response = await updateProductApi(id, formData);
    return response.data;
}

export async function deleteProduct(id) {
  const response = await deleteProductApi(id);
  return response.data;
}