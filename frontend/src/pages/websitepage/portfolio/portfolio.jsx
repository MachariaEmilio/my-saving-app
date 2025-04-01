import React from "react";
import "./Portfolio.css";

function Portfolio() {
  const projects = [
    {
      title: "Project 1: Mobile App Design",
      description: "Designed a user-friendly mobile app for a finance company.",
      image: "/assets/project1.jpg", // Replace with your image
    },
    {
      title: "Project 2: E-commerce Website",
      description:
        "Developed an e-commerce website with a seamless checkout process.",
      image: "/assets/project2.jpg", 
    }
    
  ];

  return (
    <div className="portfolio-container">
      <h1>Our Portfolio</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-item" key={index}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
