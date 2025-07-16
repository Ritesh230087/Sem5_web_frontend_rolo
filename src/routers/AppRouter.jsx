import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Register";
import ForgotPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
import ResetLinkSent from '../pages/ResetLinkSent';
import HomePage from "../pages/Homepage";
import Aboutsus from "../components/homepage/Aboutus"
import Contact from "../components/homepage/Contact"
import ProfilePage from "../pages/ProfilePage"
import NotificationsPage from "../pages/NotificationPage";
import ProductDetail from "../pages/product/productDetail";
import ProductPage from "../pages/product/productPage";
import CartPage from "../pages/cart/Cart";
import OrderForm from "../components/order/OrderForm";
import PaymentMethodPage from "../pages/payment/PaymentMethodPage"
import PaymentSuccess from '../pages/payment/PaymentSuccess';
import PaymentFail from '../pages/payment/PaymentFail';


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
import BankTransferDetails from "../pages/payment/BankTransferDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-link-sent" element={<ResetLinkSent />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Normal User Routes */}
        <Route element={<NormalUserRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/aboutus" element={<Aboutsus />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:categoryId" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/payment" element={<PaymentMethodPage />} />
            <Route path="/bank-transfer-details" element={<BankTransferDetails />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-fail" element={<PaymentFail />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminUserRoute />}>
          <Route path="" element={<Dashboard />}>
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
