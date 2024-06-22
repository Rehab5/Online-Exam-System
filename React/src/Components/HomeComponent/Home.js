// Home.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import pic1 from '../../images/1.png';
import pic2 from '../../images/s1.jpg';
import pic3 from '../../images/s2.jpg';
import Footer from './Footer'; // Import the Footer component

function Home() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand">
                <img src={pic1} alt="Online Exam" width="50" height="30" className="d-inline-block align-text-top" />
                Online Exam System
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink exact to="/StudentLogin" className="nav-link">
                    Student
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/AdminLogin" className="nav-link">
                    Admin
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={pic2} className="d-block w-100" alt="..." height="600" />
            </div>
            <div className="carousel-item">
              <img src={pic3} className="d-block w-100" alt="..." height="600" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Include the Footer component */}
      <Footer />
    </>
  );
}

export default Home;
