import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>SocialApp</Link>
            </div>
            <div style={styles.navLinks}>
                <Link to="/" style={styles.link}>Home</Link>
                {user && <Link to="/chat" style={styles.link}>Chat</Link>}
                {user && <Link to="/notifications" style={styles.link}>Notifications</Link>}
            </div>
            <div style={styles.authSection}>
                {user ? (
                    <>
                        <button onClick={logout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
    },
    authSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
    welcome: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
};

export default Navbar;
