import React from 'react';
import '../assets/styles/Loader.css'; // Import the CSS for the loader
import Logo from '../assets/logo/YW.png'; // Import the logo image

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={Logo} alt="Loading..." className="loader-image" />
      </div>
    </div>
  );
};

export default Loader;