import React, { useEffect, useState } from "react";
import "./Team.css";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";


function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/team`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="team">

      <h2>Team</h2>

      <p className="team-text">
        Our talented team members
      </p>

      <div className="team-container">

        {members.map((member) => (

          <div className="team-card" key={member._id}>

            <img
              src={`http://localhost:5000/uploads/${member.image}`}
              alt={member.name}
            />

            <h3>{member.name}</h3>

            <p>{member.role}</p>

            <div className="social">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Team;