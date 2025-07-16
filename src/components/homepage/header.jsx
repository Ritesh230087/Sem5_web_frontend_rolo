import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../services/admin/categoryService";
import { getCartCount } from "../../services/cartService";
import "../../styles/globals.css";
import "./Header.css";

import {
  getNotificationsApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi
} from "../../api/notificationApi";

const Header = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchNotifications = useCallback(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const { data } = await getNotificationsApi(token);
    setNotifications(data.data || data || []);
  } catch (error) {
    console.error("Polling for notifications failed:", error.message);
  }
}, []);


  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  useEffect(() => {
    fetchCategories().then(setCollections).catch(console.error);
  }, []);

  useEffect(() => {
    const onCartUpdated = () => setCartCount(getCartCount());
    setCartCount(getCartCount());
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => window.removeEventListener("cartUpdated", onCartUpdated);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification) => {
    setShowNotifications(false);
    if (!notification.isRead) {
      try {
        await markNotificationAsReadApi(notification._id);
        fetchNotifications();
      } catch (err) {
        console.error("Failed to mark as read", err);
      }
    }
    navigate(notification.link || "/profile");
  };

  const handleMarkAllAsRead = async (event) => {
    event.stopPropagation();
    try {
      await markAllNotificationsAsReadApi();
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setNotifications([]);
    setShowProfile(false);
    navigate("/login");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/">
            <img src="/images/Rolo Logo.jpeg" alt="Rolo" className="logo" />
          </Link>

          <nav className="nav-desktop">
            <div className="dropdown">
              <span className="nav-link">Collections</span>
              <div className="dropdown-menu">
                {collections.map((category) => (
                  <Link
                    key={category._id}
                    to={`/products/${category._id}`}
                    className="dropdown-item"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/products" className="nav-link">
              Discover Rolo
            </Link>
            <Link to="/aboutus" className="nav-link">
              About
            </Link>
            <Link to="/Contact" className="nav-link">
              Contact
            </Link>
          </nav>

          <div className="nav-icons">
            {user ? (
              <>
                <div className="notification-wrapper" ref={notifRef}>
                  <button
                    className="icon-button"
                    onClick={() => setShowNotifications((prev) => !prev)}
                  >
                    🔔
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="notification-dropdown">
                      <div className="dropdown-header">
                        <h4>Notifications</h4>
                        {unreadCount > 0 && (
                          <button
                            className="mark-all-read-btn"
                            onClick={handleMarkAllAsRead}
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="dropdown-list">
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map((n) => (
                            <div
                              key={n._id}
                              className={`notification-item ${
                                n.isRead ? "read" : "unread"
                              } category-${n.category}`}
                              onClick={() => handleNotificationClick(n)}
                            >
                              <p className="notification-message">{n.message}</p>
                              <span className="notification-time">
                                {new Date(n.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="empty-state">You're all caught up!</div>
                        )}
                      </div>
                      <div className="notification-footer">
                        <Link
                          to="/notifications"
                          onClick={() => setShowNotifications(false)}
                        >
                          View All Notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="profile-wrapper" ref={profileRef}>
                  <button
                    className="icon-button"
                    onClick={() => setShowProfile((prev) => !prev)}
                  >
                    👤
                  </button>
                  {showProfile && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header user-info">
                        <div className="avatar-circle">{user.firstName?.[0]}</div>
                        <div className="user-details">
                          <h4>
                            {user.firstName} {user.lastName}
                          </h4>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      <div className="dropdown-list profile-menu">
                        <button
                          className="profile-item"
                          onClick={() => {
                            setShowProfile(false);
                            navigate("/profile");
                          }}
                        >
                          👤 My Profile
                        </button>
                        <button
                          className="profile-item"
                          onClick={() => {
                            setShowProfile(false);
                            navigate("/profile?tab=orders");
                          }}
                        >
                          📦 Order History
                        </button>
                        <button
                          className="profile-item logout-btn"
                          onClick={handleLogout}
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="nav-link login-btn">
                Login
              </Link>
            )}
            <Link to="/cart" className="icon-button cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
