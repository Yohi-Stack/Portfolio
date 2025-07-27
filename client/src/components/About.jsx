import React, { useEffect, useRef } from "react";
import "../assets/styles/About.css";

function About() {
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-progress");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about container">
      <div className="about-header">
        <h2 className="about-title">About Me</h2>
        <div className="section-divider"></div>
      </div>
      <div className="about-content">
        <div className="about-main">
          <p className="about-summary">
            I'm Yoheswaran M, a results-driven MERN Stack Developer with over
            2.6 years of experience specializing in building full-stack web
            applications. Proficient in MongoDB, Express.js, React.js, and
            Node.js, I have a strong expertise in API integration, RESTful
            services, and frontend development. My work focuses on creating
            scalable applications with seamless user experiences, utilizing
            modern tools like React Hooks, JWT authentication, and cloud
            platforms (Heroku, Vercel, Netlify). Passionate about responsive
            design and UI/UX best practices, I enjoy solving complex problems
            and contributing to innovative projects. In my free time, I
            participate in hackathons and explore open-source contributions.
          </p>
          <h3 className="about-subtitle">Core Skills</h3>
          <div className="skills-container" ref={skillsRef}>
            <div className="skill-progress">
              <span className="skill-name">JavaScript (ES6+)</span>
              <div className="progress-bar1">
                <div className="progress-fill" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="skill-progress">
              <span className="skill-name">React.js</span>
              <div className="progress-bar1">
                <div className="progress-fill" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="skill-progress">
              <span className="skill-name">Node.js</span>
              <div className="progress-bar1">
                <div className="progress-fill" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="skill-progress">
              <span className="skill-name">MongoDB</span>
              <div className="progress-bar1">
                <div className="progress-fill" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
          <div className="skills-tags">
            {[
              "HTML5",
              "CSS3",
              "TypeScript (basic)",
              "Redux",
              "Tailwind CSS",
              "Bootstrap",
              "Material UI",
              "Express.js",
              "Git",
              "GitHub",
              "VS Code",
              "Postman",
              "Figma",
              "React Testing Library",
            ].map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <aside className="about-sidebar">
          <div className="card education-card">
            <h3 className="card-title">Education</h3>
            <div className="card-content">
              <p>
                <strong>B.Sc. Computer Technology</strong>
                <br />
                Kongu Engineering College (2016-2019)
                <br />
                GPA: 7.5
              </p>
              <p>
                <strong>MBA Export Management</strong>
                <br />
                Bharathiar University (2021-2023)
                <br />
                GPA: 6.5
              </p>
            </div>
          </div>
          <div className="card certification-card">
            <h3 className="card-title">Certifications</h3>
            <div className="card-content">
              <p>Cambridge English Certificate (2017)</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default About;
