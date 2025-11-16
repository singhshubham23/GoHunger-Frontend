import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center
                       py-3 my-4 border-top bg-dark text-light">
      <div className="col-md-4 d-flex align-items-center">
        <Link
          to="/"
          className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1"
          aria-label="Home"
        >
          <svg className="bi" width={30} height={24} aria-hidden="true">
            <use xlinkHref="#bootstrap" />
          </svg>
        </Link>
        <span className="mb-3 mb-md-0">© 2025 GoHungry, Inc</span>
      </div>

    </footer>
  );
};

export default Footer;
