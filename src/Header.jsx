import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="nav-item-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="nav-item">
        {title} <FaChevronDown size={12} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          ReBuy
        </Link>
        
        <nav className="navigation desktop-nav">
          <Dropdown title="Solutions">
            <Link to="/dashboard" className="dropdown-link">For Retailers</Link>
            <Link to="/marketplace" className="dropdown-link">For Consumers</Link>
            <Link to="/ngo" className="dropdown-link">For NGOs</Link>
          </Dropdown>

          <NavLink to="/resources" className="nav-item">Resources</NavLink>
          
          <NavLink to="/pricing" className="nav-item">Pricing</NavLink>
        </nav>

        <div className="header-actions desktop-nav">
          <Link to="/login" className="action-link">Log In</Link>
          <Link to="/signup" className="action-button">Sign Up</Link>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <NavLink to="/dashboard" className="mobile-nav-link">For Retailers</NavLink>
          <NavLink to="/marketplace" className="mobile-nav-link">For Consumers</NavLink>
          <NavLink to="/ngo" className="mobile-nav-link">For NGOs</NavLink>
          <NavLink to="/resources" className="mobile-nav-link">Resources</NavLink>
          <NavLink to="/pricing" className="mobile-nav-link">Pricing</NavLink>
          <div className="mobile-actions">
            <Link to="/login" className="action-link">Log In</Link>
            <Link to="/signup" className="action-button">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 