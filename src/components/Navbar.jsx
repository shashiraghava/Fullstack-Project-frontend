import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, PlusCircle, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    // basename remove chesi compare cheyyadam (IMPORTANT for GitHub Pages)
    const currentPath = location.pathname.replace("/urban-renovate", "");

    const isActive = (path) => {
        return currentPath === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                
                {/* Brand */}
                <Link to="/" className="brand">
                    <Sparkles className="brand-icon" />
                    <span>ValueEnhancer</span>
                </Link>

                {/* Links */}
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