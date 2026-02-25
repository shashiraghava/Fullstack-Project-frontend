import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, PlusCircle, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="brand">
                    <Sparkles className="brand-icon" />
                    <span>ValueEnhancer</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/ideas" className={`nav-link ${isActive('/ideas')}`}>
                        <Sparkles size={18} /> Discover Ideas
                    </Link>
                    <Link to="/submit" className={`nav-link ${isActive('/submit')}`}>
                        <PlusCircle size={18} /> Estimate Value
                    </Link>
                    <Link to="/admin" className={`nav-link admin-link ${isActive('/admin')}`}>
                        <LayoutDashboard size={18} /> Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
