import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import profileImage from "../assets/profile.jpg";
import "../assets/styles/Home.css";

function Home() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <img
          src={profileImage}
          alt="Yoheswaran M, MERN Stack Developer"
          className="profile-image"
          aria-label="Profile picture of Yoheswaran M"
        />
        <h1 className="hero-title">Hi, I'm Yoheswaran M</h1>
        <h2 className="hero-subtitle">
          <TypeAnimation
            sequence={[
              "MERN Stack Developer",
              1000,
              "Full-Stack Enthusiast",
              1000,
              "UI/UX Advocate",
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h2>
        <p className="hero-text">
          I create scalable full-stack web applications that deliver seamless
          user experiences. With 2+ years of experience in the MERN stack, I
          help businesses achieve robust digital solutions.
        </p>
        <div className="hero-buttons">
          <Link to="/portfolio" className="btn btn-primary">
            View Portfolio
          </Link>
          <Link to="/resume" className="btn btn-secondary">
            View Resume
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Me
          </Link>
        </div>
        <div className="social-links">
          <a
            href="mailto:yohesmahendran@gmail.com"
            className="social-link"
            title="Email"
            aria-label="Email Yoheswaran M"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/yohes-mahendran/"
            className="social-link"
            title="LinkedIn"
            aria-label="Yoheswaran M's LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/yohesmahendran"
            className="social-link"
            title="GitHub"
            aria-label="Yoheswaran M's GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
