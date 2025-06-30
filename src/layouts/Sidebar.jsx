import { NavLink } from "react-router-dom";
import "../styles/dashboard.css"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">ROLO Admin</div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/users" className="sidebar-link">Users</NavLink>
        <NavLink to="/admin/categories" className="sidebar-link">Categories</NavLink>
        <NavLink to="/admin/products" className="sidebar-link">Products</NavLink>
        <NavLink to="/admin/orders" className="sidebar-link">Orders</NavLink>
      </nav>
    </aside>
  );
}