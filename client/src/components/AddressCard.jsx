import React, { useState } from 'react';
import '../assets/styles/Flipcard.css'; 

const AddressCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="card-container">
      <div
        className={`flip-card ${flipped ? 'flipped' : ''}`}
        onClick={handleClick}
      >
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front">
            <h3>CLICK TO CONNECT</h3>
            
          </div>
          {/* Back Side */}
          <div className="flip-card-back">
            <div className="social-icons">
            <a
              href="mailto:yoheswaran.2108@gmail.com"
              className="social-link"
              title="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-envelope icon"></i><span className='connect'>yoheswaran.2108@gmail.com</span>
            </a>
            <a
              href="tel:+919489450566"
              className="social-link"
              title="Phone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-phone icon"></i><span className='connect'>+919489450566</span>
            </a>
            <a
              href="https://www.linkedin.com/in/yohes-mahendran/"
              className="social-link"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin icon"></i>
              
              <span className='connect'>yohes-mahendran</span>
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
