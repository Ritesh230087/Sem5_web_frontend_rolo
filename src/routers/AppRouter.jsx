import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Register";
import HomePage from "../pages/Homepage";
import ProductDetail from "../pages/product/productDetail";


import AdminUserRoute from "./AdminUserRoute";
import NormalUserRoute from "./NormalUserRoute";
import GuestRoute from "./GuestRoute";

import UserLayout from "../layouts/UserLayout";
import Dashboard from "../layouts/Dashboard";

import UserManagement from "../pages/admin/UserManagement";
import CategoryManagement from "../pages/admin/CategoryManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import RibbonManagement from "../pages/admin/RibbonManagement";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>
        </Route>

        {/* Normal User Routes */}
        <Route element={<NormalUserRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminUserRoute />}>
          <Route path="" element={<Dashboard />}>
            {/* <Route index element={<div>Welcome to Admin Dashboard</div>} /> */}
            <Route path="users" element={<UserManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="ribbons" element={<RibbonManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="*" element={<>Admin Page Not Found</>} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
