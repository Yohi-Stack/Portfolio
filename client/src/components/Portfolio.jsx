import React, { useEffect, useRef } from "react";
import schoolPanda from "../assets/schoolpanda.png";
import aamdhane from "../assets/amdhane.png";
import holelaJapan from "../assets/hotela.png";
import blazingCoders from "../assets/blazingCoders.png";
import "../assets/styles/Portfolio.css";

function Portfolio() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-card");
            }, index * 200); // Staggered animation
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "School Panda",
      image: schoolPanda,
      alt: "School Panda school management platform",
      date: "Jan 2024 - Present",
      description:
        "A school management platform built with HTML, CSS, React.js, Node.js, and Material UI. Features include real-time dashboards, student/staff management, and an interactive calendar.",
      technologies: ["React.js", "Node.js", "MongoDB", "Material UI", "Axios"],
      link: null,
    },
    {
      title: "Aamdhane",
      image: aamdhane,
      alt: "Aamdhane job matchmaking platform",
      date: "Mar 2023",
      description:
        "A job matchmaking platform for India's blue-collar workforce, focusing on mobile-first design and user experience.",
      technologies: ["HTML", "CSS", "jQuery", "JavaScript"],
      link: "https://aamdhane.com",
    },
    {
      title: "Hotela Japan",
      image: holelaJapan,
      alt: "Hotela Japan hotel booking platform",
      date: "Aug 2024 - Present",
      description:
        "A live hotel booking platform with responsive frontend components and dynamic backend architecture.",
      technologies: ["MERN Stack", "HTML5", "CSS3", "Figma", "MySQL"],
      link: null,
    },
    {
      title: "Blazing Coders",
      image: blazingCoders,
      alt: "Blazing Coders coding bootcamp",
      date: "Jan 2024 - Present",
      description:
        "Blazing Coders is a Coimbatore-based web development company offering custom websites, mobile apps, and digital solutions for businesses globally.",
      technologies: ["HTML5", "CSS3", "Figma", "MySQL", "PHP"],
      link: "https://www.blazingcoders.com/",
    },
  ];

  return (
    <section className="portfolio container">
      <div className="portfolio-header">
        <h2 className="portfolio-title">Portfolio</h2>
        <div className="section-divider"></div>
      </div>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            ref={(el) => (cardsRef.current[index] = el)}
            role="article"
            aria-labelledby={`project-title-${index}`}
          >
            <div className="project-image">
              <img
                src={project.image}
                alt={project.alt}
                className="project-img"
              />
            </div>
            <div className="project-content">
              <h3 id={`project-title-${index}`} className="project-title">
                {project.title}
              </h3>
              <p className="project-date">{project.date}</p>
              <p className="project-description">{project.description}</p>
              <div className="tech-tags">
                {project.technologies.map((tech, techIdx) => (
                  <span key={techIdx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  className="btn btn-primary project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} live site`}
                >
                  Live Site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
