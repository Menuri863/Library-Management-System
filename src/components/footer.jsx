import React from 'react';
import './footer.css';
import { FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        
        <div className="footer-section">
          <h3>CONTACT US</h3>
          <p><strong>📍:</strong> Veyangoda Public Library</p>
          <p><strong>📞:</strong> 033 2050475</p>
          <p><strong>📧:</strong> veyangodapubliclibrary@email.com</p>
        </div>

        
        <div className="footer-section">
          <h3>MENU LINKS</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/contact">Explore</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3>FOLLOW US</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://wa.me/94700000000" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;