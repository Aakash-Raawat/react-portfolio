import React from "react";
import "./Hero.css";
import profileImage from "../assets/profile.jpeg";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">

      <div className="hero-content">

        <h1>
          Hi, I'm <span>Aakash Rawat</span>
        </h1>

        <h2>
          MERN Stack Developer
        </h2>

        <p>
          I build modern and responsive web applications
          using React, Node.js, Express and MongoDB.
        </p>


        <div className="hero-buttons">

          <button>
            Download Resume
          </button>

          <button className="contact-btn"
           onClick={()=> navigate("/Contact")}>
            Contact Me
          </button>

        </div>


        <div className="social-icons">

          <a href="https://github.com/Aakash-Raawat">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/aakash-raawat-a00280417" >
            LinkedIn
          </a>

        </div>


      </div>


      <div className="hero-image">

        <img 
          src={profileImage}
          alt="profile"
        />

      </div>


    </section>
  );
}

export default Hero;