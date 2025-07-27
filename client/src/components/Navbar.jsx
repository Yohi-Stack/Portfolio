import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import Logo from '../assets/logo/YW.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsContactOpen(false); // Close contact dropdown when toggling menu
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
    setIsOpen(false); // Close nav menu when toggling contact
  };

  return (
    <nav className="navbar">
      
        <div className="navbar-content">
            <Link to="/"><img src={Logo} alt="Logo"  className="navbar-logo" /></Link>
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
         
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resume"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Resume
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          
          <div className="contact-container marg-left">
            <button
              className="contact-toggle btn btn-outline"
              onClick={toggleContact}
              aria-label="Toggle contact information"
            >
              Connect
            </button>
            <div className={`contact-dropdown ${isContactOpen ? 'open' : ''}`}>
              <a
                href="mailto:yohesmahendran@gmail.com"
                className="contact-item"
                title="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-envelope"></i> yohesmahendran@gmail.com
              </a>
              <a
                href="tel:+919489450566"
                className="contact-item"
                title="Phone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-phone"></i> +91 9489450566 <br></br> +91 7904210636
              </a>
              <a
                href="https://www.linkedin.com/in/yohes-mahendran/"
                className="contact-item"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i> yohes-mahendran
              </a>
            </div>
          </div>
        </div>
      
    </nav>
  );
}

export default Navbar;