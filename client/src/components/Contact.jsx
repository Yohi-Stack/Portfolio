import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Contact.css';
import AddressCard from './AddressCard';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const socialRef = useRef(null);

  const validateForm = (data) => {
    if (!data.name.trim()) return 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Valid email is required';
    if (!/^\+?\d{7,15}$/.test(data.phone)) return 'Valid phone number is required';
    if (!data.message.trim()) return 'Message is required';
    return '';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    if (formRef.current) {
      formRef.current.classList.add('shake');
      setTimeout(() => formRef.current.classList.remove('shake'), 300);
    }

    try {
      const response = await axios.post('/api/contact', formData);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSuccessMessage(response.data.mongoStatus || response.data.message);
    } catch (err) {
      const serverError = err.response?.data?.error || 'Failed to send message';
      const details = err.response?.data?.details || err.response?.data?.errors?.join(', ') || '';
      setError(`${serverError}${details ? `: ${details}` : ''}`);
      console.error('Error submitting form:', err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animate'), index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (socialRef.current) observer.observe(socialRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact container">
      <div className="contact-header">
        <h2 className="contact-title">Contact Me</h2>
        <div className="section-divider"></div>
      </div>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form" ref={formRef}>
          <h3 className="form-title">Get in Touch</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              rows="5"
              className="form-input"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary form-submit"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : 'Send Message'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
        <div className="" ref={socialRef}>
          {/* social-links */}
        <AddressCard />
        </div>
      </div>
    </section>
  );
}

export default Contact;