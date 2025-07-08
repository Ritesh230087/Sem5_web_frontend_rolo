import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getBackendImageUrl } from "../../../utils/backend-image";
import "../../../styles/dashboard.css";

export default function ProductTable({ products, viewProduct, editProduct, removeProduct }) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Ribbon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>
                <img
                  src={getBackendImageUrl(p.filepath)}
                  alt={p.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
                />
              </td>
              <td>Rs. {p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.categoryId?.name || "-"}</td>
              <td>{p.ribbonId?.label || "None"}</td>
              <td className="action-buttons">
                <button onClick={() => viewProduct(p._id)} className="btn btn-view">
                  <FaEye /> View
                </button>
                <button onClick={() => editProduct(p._id)} className="btn btn-edit">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => removeProduct(p._id)} className="btn btn-delete">
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
