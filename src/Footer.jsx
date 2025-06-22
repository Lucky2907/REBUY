import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaRecycle, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerAbout}>
          <Link to="/" className={styles.footerLogo}>
            <FaRecycle />
            ReBuy
          </Link>
          <p>Intelligent return & resale experiences.</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <h4>Solutions</h4>
            <Link to="/dashboard">For Retailers</Link>
            <Link to="/marketplace">For Consumers</Link>
            <Link to="/ngo">For NGOs</Link>
          </div>
          <div className={styles.footerColumn}>
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/press">Press</Link>
          </div>
          <div className={styles.footerColumn}>
            <h4>Resources</h4>
            <Link to="/resources">Blog</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} ReBuy. All rights reserved.</p>
        <div className={styles.footerSocial}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 