
import React, { useState, useEffect } from "react";
import { useProduct } from "../../hooks/admin/useProduct";
import { fetchCategories } from "/src/services/admin/categoryService";
import { fetchRibbons } from "../../services/admin/ribbonService";
import ProductTable from "../../components/admin/product/ProductTable";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

export default function ProductManagement() {
  const {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    getProductById,
  } = useProduct();

  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ribbons, setRibbons] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchRibbons().then(setRibbons);
  }, []);

  const openForm = async (productId = null) => {
    if (productId) {
      const prod = await getProductById(productId);
      setEditingId(prod._id);
      setFormData({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        originalPrice: prod.originalPrice,
        quantity: prod.quantity,
        categoryId: prod.categoryId?._id || "",
        ribbonId: prod.ribbonId?._id || "",
        featured: prod.featured,
        material: prod.material || "",
        origin: prod.origin || "",
        care: prod.care || "",
        warranty: prod.warranty || "",
        features: prod.features || [],
        extraImages: [], 
        image: null,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        quantity: "",
        categoryId: "",
        ribbonId: "",
        featured: false,
        material: "",
        origin: "",
        care: "",
        warranty: "",
        features: [],
        extraImages: [],
        image: null,
      });
      setEditingId(null);
    }
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      if (name === "extraImages") {
        setFormData({ ...formData, extraImages: Array.from(files) });
      } else {
        setFormData({ ...formData, image: files[0] });
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData({ ...formData, features: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await editProduct(editingId, formData); 
        toast.success("Product updated");
      } else {
        await addProduct(formData); 
        toast.success("Product added");
      }
      setShowForm(false);
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeProduct(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleView = async (id) => {
    const prod = await getProductById(id);
    setViewProduct(prod);
  };

  const inputStyle = {
    fontSize: "1rem",
    padding: "10px",
    width: "100%",
    backgroundColor: "#2b2b2b",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "4px",
  };

  return (
    <div className="admin-page">
      <h2 className="page-title">Product Management</h2>
      <button className="btn btn-add-category" onClick={() => openForm()}>
        + Add Product
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ProductTable
        products={products}
        viewProduct={handleView}
        editProduct={openForm}
        removeProduct={handleDelete}
      />

      {showForm && (
        <div className="modal-backdrop">
          <div
            className="modal wide-modal"
            style={{
              width: "90%",
              maxWidth: "1200px",
              maxHeight: "95vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{editingId ? "Edit Product" : "Add Product"}</h3>
              <FaTimes
                onClick={() => setShowForm(false)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
              }}
            >
              <label>
                Name:{" "}
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label>
                Price:{" "}
                <input
                  name="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label>
                Original Price:{" "}
                <input
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice || ""}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label>
                Quantity:{" "}
                <input
                  name="quantity"
                  type="number"
                  value={formData.quantity || ""}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </label>
              <label>
                Category:{" "}
                <select
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Ribbon:{" "}
                <select
                  name="ribbonId"
                  value={formData.ribbonId || ""}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">-- No Ribbon --</option>
                  {ribbons.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ gridColumn: "span 2" }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={!!formData.featured}
                  onChange={handleChange}
                />{" "}
                Featured
              </label>

              <label style={{ gridColumn: "span 2" }}>
                Description:
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </label>

              <label>
                Material:{" "}
                <input
                  name="material"
                  value={formData.material || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label>
                Origin:{" "}
                <input
                  name="origin"
                  value={formData.origin || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label>
                Care Instructions:{" "}
                <input
                  name="care"
                  value={formData.care || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label>
                Warranty:{" "}
                <input
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              <div style={{ gridColumn: "span 2" }}>
                <label>Features:</label>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginBottom: "0.5rem",
                  }}
                >
                  {formData.features?.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#444",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>{feat}</span>
                      <FaTimes
                        onClick={() => removeFeature(i)}
                        style={{ marginLeft: "6px", cursor: "pointer" }}
                        title="Remove feature"
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add feature"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn-submit"
                    onClick={addFeature}
                  >
                    + Add
                  </button>
                </div>
              </div>

              <label style={{ gridColumn: "span 2" }}>
                Main Image:{" "}
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              <label style={{ gridColumn: "span 2" }}>
                Extra Images:{" "}
                <input
                  type="file"
                  name="extraImages"
                  onChange={handleChange}
                  multiple
                  accept="image/*"
                />
              </label>

              <div
                className="modal-actions"
                style={{
                  gridColumn: "span 2",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button type="submit" className="btn btn-submit">
                  {editingId ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  type="button"
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewProduct && (
        <div
          className="modal-backdrop"
          onClick={() => setViewProduct(null)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="modal wide-modal"
            style={{
              width: "90%",
              maxWidth: "1200px",
              maxHeight: "95vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>View Product</h3>
              <FaTimes
                onClick={() => setViewProduct(null)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
            >
              <p>
                <strong>Name:</strong> {viewProduct.name}
              </p>
              <p>
                <strong>Price:</strong> Rs. {viewProduct.price}
              </p>
              <p>
                <strong>Original Price:</strong> Rs. {viewProduct.originalPrice}
              </p>
              <p>
                <strong>Discount:</strong> {viewProduct.discountPercent}%
              </p>
              <p>
                <strong>Quantity:</strong> {viewProduct.quantity}
              </p>
              <p>
                <strong>Category:</strong> {viewProduct.categoryId?.name}
              </p>
              <p>
                <strong>Ribbon:</strong> {viewProduct.ribbonId?.label || "None"}
              </p>
              <p>
                <strong>Featured:</strong> {viewProduct.featured ? "Yes" : "No"}
              </p>
              <p>
                <strong>Material:</strong> {viewProduct.material}
              </p>
              <p>
                <strong>Origin:</strong> {viewProduct.origin}
              </p>
              <p>
                <strong>Care:</strong> {viewProduct.care}
              </p>
              <p>
                <strong>Warranty:</strong> {viewProduct.warranty}
              </p>
              <div style={{ gridColumn: "span 2" }}>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>{viewProduct.description}</p>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <p>
                  <strong>Features:</strong>
                </p>
                <ul>{viewProduct.features?.map((f, i) => <li key={i}>{f}</li>)}</ul>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <p>
                  <strong>Main Image:</strong>
                </p>
                <img
                  src={`http://localhost:5050/${viewProduct.filepath || viewProduct.image}`}
                  alt={viewProduct.name}
                  style={{ maxWidth: "250px", width: "100%", borderRadius: 8 }}
                />
              </div>
              {viewProduct.extraImages?.length > 0 && (
                <div style={{ gridColumn: "span 2" }}>
                  <p>
                    <strong>Extra Images:</strong>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {viewProduct.extraImages.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5050/${img}`}
                        alt={`Extra ${i + 1}`}
                        style={{ width: "100px", borderRadius: 6 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
