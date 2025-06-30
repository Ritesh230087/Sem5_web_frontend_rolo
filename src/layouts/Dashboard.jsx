Dashboard.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div></div>
          <button
            className="logout-button-top"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}