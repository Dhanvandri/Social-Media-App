import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('/api/notifications', {
                    headers: { Authorization: localStorage.getItem('token') },
                });
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications', error.message);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Notifications</h3>
            {notifications.length === 0 ? (
                <p style={styles.emptyMessage}>No new notifications</p>
            ) : (
                <ul style={styles.notificationList}>
                    {notifications.map((note, index) => (
                        <li key={index} style={styles.notificationItem}>
                            {note}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '80%',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    header: {
        fontSize: '24px',
        marginBottom: '15px',
        color: '#333',
    },
    emptyMessage: {
        fontSize: '16px',
        color: '#888',
    },
    notificationList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        textAlign: 'left',
    },
    notificationItem: {
        padding: '10px 15px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: '#555',
        fontSize: '14px',
    },
};

export default Notification;
