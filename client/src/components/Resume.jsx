import React, { useEffect, useRef } from 'react';
import resumePDF from '../assets/YoheswaranMernResume.pdf';
import Css from '../assets/logo/Css-logo.png';
import JavaScript from '../assets/logo/JS-logo.png';
import Git from '../assets/logo/git-logo.png';
import Html from '../assets/logo/HTML5_logo.png';
import ReactLogo from '../assets/logo/react-logo.png';
import Mongo from '../assets/logo/mongo-logo.png';
import Node from '../assets/logo/node-logo.png';
import '../assets/styles/Resume.css';

function Resume() {
  const skillsRef = useRef(null);
  const timelineRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 200); 
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);
    timelineRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'JavaScript', value: 90, logo: JavaScript }, 
    { name: 'React.js', value: 85, logo: ReactLogo },
    { name: 'Node.js', value: 80, logo: Node },
    { name: 'MongoDB', value: 80, logo: Mongo },
    { name: 'HTML5', value: 90, logo: Html }, 
    { name: 'CSS3', value: 90, logo: Css }, 
    { name: 'Git', value: 85, logo: Git },
  ];

  return (
    <section className="resume container">
      <div className="resume-header">
        <h2 className="resume-title">Resume</h2>
        <div className="section-divider"></div>
      </div>
      <div className="resume-content">
        <div className="timeline">
          <h3 className="section-title">Work Experience</h3>
          <div
            className="timeline-item"
            ref={(el) => (timelineRef.current[0] = el)}
            role="article"
            aria-labelledby="work-experience-1"
          >
            <h4 id="work-experience-1" className="timeline-title">
              MERN Stack Developer, Blazingcoders, Coimbatore
            </h4>
            <p className="timeline-date">Jan 2023 - Present</p>
            <ul className="timeline-details">
              <li>Developed scalable full-stack web applications using MERN stack.</li>
              <li>Designed and integrated RESTful APIs for real-time data exchange.</li>
              <li>Utilized React Hooks for state management and built reusable components.</li>
              <li>Implemented JWT authentication for secure user access.</li>
              <li>Deployed applications on Heroku, Vercel, and Netlify.</li>
            </ul>
          </div>
        </div>
        <div className="timeline">
          <h3 className="section-title">Education</h3>
          <div
            className="timeline-item"
            ref={(el) => (timelineRef.current[1] = el)}
            role="article"
            aria-labelledby="education-1"
          >
            <h4 id="education-1" className="timeline-title">
              B.Sc. Computer Technology
            </h4>
            <p className="timeline-date">Kongu Engineering College, 2016-2019</p>
            <p className="timeline-details">GPA: 7.5</p>
          </div>
          <div
            className="timeline-item"
            ref={(el) => (timelineRef.current[2] = el)}
            role="article"
            aria-labelledby="education-2"
          >
            <h4 id="education-2" className="timeline-title">
              MBA Export Management
            </h4>
            <p className="timeline-date">Bharathiar University, 2021-2023</p>
            <p className="timeline-details">GPA: 6.5</p>
          </div>
        </div>
        <div className="skills-section" ref={skillsRef}>
          <h3 className="section-title">Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {skill.logo ? (
                  <div className="skill-logo-container">
                    <img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="skill-logo"
                    />
                    <span className="sr-only">{skill.name}</span>
                  </div>
                ) : (
                  <span className="skill-name">{skill.name}</span>
                )}
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ '--width': `${skill.value}%` }}
                    role="progressbar"
                    aria-valuenow={skill.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`Proficiency in ${skill.name}: ${skill.value}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="resume-download">
          <a
            href={resumePDF}
            download
            className="btn btn-primary download-btn"
            aria-label="Download Yoheswaran M's resume"
          >
            <i className="fas fa-download"></i> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;