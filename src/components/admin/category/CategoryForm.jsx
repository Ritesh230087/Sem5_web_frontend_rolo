import React, { useState, useEffect } from "react";
import CategoryForm from "../../components/admin/category/CategoryForm";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount or refresh
  const fetchCategories = async () => {
    const res = await fetch("/api/admin/category");
    const data = await res.json();
    if (data.success) setCategories(data.data); // as per your backend response
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category Management</h2>

      {/* Add category form with onSuccess to refresh list */}
      <CategoryForm onSuccess={fetchCategories} />

      {/* Here you can show the category list */}
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}{" "}
            {cat.filepath && (
              <img
                src={`http://localhost:5050/${cat.filepath}`}
                alt={cat.name}
                width={50}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

