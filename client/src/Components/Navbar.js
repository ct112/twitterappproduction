import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div className="navbar-toggler-right">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <a className="navbar-brand" href="#">
        <span className=""> Twitter Showcase </span>
      </a>

      <div className="collapse navbar-collapse" id="navbar">
        <nav className="nav d-flex flex-column flex-md-row w-100 justify-content-end">
          <Link to="/" className="flex-fill text-center text-light">
            Home
          </Link>
          <Link to="/wall" className="flex-fill text-center text-light">
            Twitter Wall
          </Link>
          <Link to="/tweet" className="flex-fill text-center text-light">
            Random Tweet
          </Link>
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
