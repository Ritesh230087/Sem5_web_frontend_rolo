import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/NotificationPage.css';

export default function NotificationsPage() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = useCallback(async () => {
        const token = localStorage.getItem('token');
        const userJSON = localStorage.getItem('user');
        if (!token || !userJSON) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userJSON);
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`http://localhost:5050/api/notifications?userId=${user._id}`, config);
            setNotifications(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const handleMarkAllAsRead = async () => {
        const token = localStorage.getItem('token');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post('http://localhost:5050/api/notifications/mark-all-read', {}, config);
            fetchNotifications();
        } catch (error) {
            console.error("Failed to mark all as read", error);
            alert("Could not mark all notifications as read. Please try again.");
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    if (loading) return <div className="loading-container">Loading Notifications...</div>;

    return (
        <div className="notifications-page">
            <div className="notifications-container">
                <div className="notifications-header">
                    <h1>All Notifications</h1>
                    {unreadCount > 0 && (
                        <button className="mark-all-read-page-btn" onClick={handleMarkAllAsRead}>
                            Mark All as Read ({unreadCount})
                        </button>
                    )}
                </div>
                <div className="notifications-list">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification._id} className={`notification-row ${notification.isRead ? 'read' : ''} category-${notification.category}`}>
                                <div className="notification-icon-container">
                                    <div className="icon-bg">
                                        {notification.category === 'order' ? '📦' : notification.category === 'promotion' ? '🎉' : '🔔'}
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <p className="notification-message">{notification.message}</p>
                                    <span className="notification-timestamp">{new Date(notification.createdAt).toLocaleString()}</span>
                                </div>
                                {!notification.isRead && <div className="unread-dot"></div>}
                            </div>
                        ))
                    ) : (
                        <p className="no-notifications">You have no notifications yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}