import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

export default function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get("tab") || "profile";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [profileData, setProfileData] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:5050/api/auth/profile', config);
                setProfileData(data.user);
                setOrderHistory(data.orders);
            } catch (err) {
                setError("Failed to fetch profile data. Please try logging in again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [navigate]);

    const updateTab = (tab) => {
        setActiveTab(tab);
        navigate(`/profile?tab=${tab}`);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put('http://localhost:5050/api/auth/profile', profileData, config);
            setProfileData(data);
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile.");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put('http://localhost:5050/api/auth/profile/change-password', passwordData, config);
            alert("Password changed successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change password.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) return <div className="loading-container">Loading Profile...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <button className="back-btn" onClick={() => navigate('/')}>← Back to Shop</button>
                <h1 className="profile-title">My Account</h1>
            </div>
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            <span>{profileData.firstName?.[0]}{profileData.lastName?.[0]}</span>
                        </div>
                        <h3>{profileData.firstName} {profileData.lastName}</h3>
                        <p>{profileData.email}</p>
                    </div>
                    <nav className="profile-nav">
                        <button className={`nav-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => updateTab("profile")}>👤 Edit Profile</button>
                        <button className={`nav-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => updateTab("orders")}>📦 Order History</button>
                        <button className={`nav-item ${activeTab === "password" ? "active" : ""}`} onClick={() => updateTab("password")}>🔒 Change Password</button>
                        <button className="nav-item logout-btn" onClick={handleLogout}>🚪 Logout</button>
                    </nav>
                </div>
                <div className="profile-content">
                    {activeTab === "profile" && (
                        <div className="content-section">
                            <h2>Edit Profile</h2>
                            <form onSubmit={handleProfileUpdate} className="profile-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" value={profileData.firstName || ''} onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" value={profileData.lastName || ''} onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" value={profileData.email || ''} onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <button type="submit" className="save-btn">Save Changes</button>
                            </form>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="content-section">
                            <h2>Order History</h2>
                            <div className="orders-list">
                                {orderHistory.length > 0 ? orderHistory.map((order) => (
                                    <div key={order._id} className="order-item">
                                        <div className="order-header">
                                            <div className="order-info">
                                                <h4>Order #{order._id.slice(-8).toUpperCase()}</h4>
                                                <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="order-status">
                                                <span className={`status ${order.deliveryStatus}`}>{order.deliveryStatus}</span>
                                            </div>
                                        </div>
                                        <div className="order-items">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="order-item-row">
                                                    <span>{item.name}</span>
                                                    <span>Qty: {item.quantity}</span>
                                                    <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="order-footer">
                                            <div className="order-total"><strong>Total: NPR {order.totalAmount.toLocaleString()}</strong></div>
                                            <div className="order-payment">Paid via {order.paymentMethod}</div>
                                        </div>
                                    </div>
                                )) : <p>You haven't placed any orders yet.</p>}
                            </div>
                        </div>
                    )}

                    {activeTab === "password" && (
                        <div className="content-section">
                            <h2>Change Password</h2>
                            <form onSubmit={handlePasswordChange} className="password-form">
                                <div className="form-group"><label>Current Password</label><input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))} required /></div>
                                <div className="form-group"><label>New Password</label><input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))} required /></div>
                                <div className="form-group"><label>Confirm New Password</label><input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))} required /></div>
                                <div className="password-requirements">
                                    <h4>Password Requirements:</h4>
                                    <ul>
                                        <li className={passwordData.newPassword.length >= 8 ? "valid" : ""}>At least 8 characters</li>
                                        <li className={/[A-Z]/.test(passwordData.newPassword) ? "valid" : ""}>One uppercase letter</li>
                                    </ul>
                                </div>
                                <button type="submit" className="save-btn">Change Password</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
