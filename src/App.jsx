import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetails from "./pages/ProjectDetails";



import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Projects from "./admin/Projects";
import Contact from "./admin/Contact";
import Skills from "./admin/Skills";
import About from "./admin/About";
import Team from "./admin/Team";

import Login from "./admin/Login";



function App() {

  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  const isLoggedIn = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route
            path="/admin/dashboard"
            element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/admin/login" replace />}/>
        {/* <Route path="/admin/projects" element={<Projects />} /> */}
        
        <Route
            path="/admin/projects"
            element={
            isLoggedIn ? <Projects /> : <Navigate to="/admin/login" replace />
    }
/>
        {/* <Route path="/admin/contact" element={<Contact />} /> */}
        <Route
            path="/admin/contact"
            element={
            isLoggedIn ? <Contact /> : <Navigate to="/admin/login" replace />
    }
/>


        {/* <Route path="/admin/skills" element={<Skills />} /> */}
        <Route
            path="/admin/skills"
            element={
            isLoggedIn ? <Skills /> : <Navigate to="/admin/login" replace />
    }
/>
        {/* <Route path="/admin/about" element={<About />} /> */}
        <Route
            path="/admin/about"
            element={
            isLoggedIn ? <About /> : <Navigate to="/admin/login" replace />
    }
/>
        {/* <Route path="/admin/team" element={<Team />} /> */}
        <Route
            path="/admin/team"
            element={
            isLoggedIn ? <Team /> : <Navigate to="/admin/login" replace />
    }
/>





        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
