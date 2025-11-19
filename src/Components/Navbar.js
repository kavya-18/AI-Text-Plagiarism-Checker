import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">

        <a className="navbar-brand d-flex align-items-center" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="currentColor"
            className="bi bi-robot me-2" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0..."></path>
            <path d="M8.5 1.866a1 1 0..."></path>
          </svg>

          <strong className="website-heading">Generative AI Detection</strong>
        </a>

      </div>
    </nav>
  );
};

export default Navbar;
