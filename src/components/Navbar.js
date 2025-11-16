import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "./ContextReducer";
import CartModal from "./CartModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [showCart, setShowCart] = useState(false);
  const cartItems = useCart();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      const name = localStorage.getItem("userName") || "";
      setIsLoggedIn(!!token);
      setUserName(name);
    };

    window.addEventListener("loginEvent", checkLoginStatus);
    checkLoginStatus();

    return () => {
      window.removeEventListener("loginEvent", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setShowCart(false);

    window.dispatchEvent(new Event("loginEvent"));
    
    navigate("/login");
  };

  const totalQty = cartItems.reduce(
    (s, it) => s + (Number(it.quantity) || 0),
    0
  );

  return (
    <>
      {" "}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm"
        style={{
          marginBottom: "0",
          padding: "0.3rem 1rem",
          borderBottom: "2px solid #2e7d32",
        }}
      >
        {" "}
        <div className="container-fluid">
          {" "}
          <Link className="navbar-brand fs-2 fw-bold fst-italic" to="/">
            🍴 Go Hunger{" "}
          </Link>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />{" "}
          </button>{" "}
          <div className="collapse navbar-collapse" id="navbarNav">
            {" "}
            <ul className="navbar-nav me-auto">
              {" "}
              <li className="nav-item mb-2 mb-lg-0">
                {" "}
                <Link
                  className="btn fs-5 bg-white text-success me-3 me-lg-0"
                  to="/"
                >
                  Home{" "}
                </Link>{" "}
              </li>{" "}
            </ul>{" "}
            <ul className="navbar-nav ms-auto d-flex align-items-lg-center flex-column flex-lg-row">
              {" "}
              {!isLoggedIn ? (
                <>
                  {" "}
                  <li className="nav-item me-2 mb-2 mb-lg-0">
                    {" "}
                    <Link
                      className="btn fs-6 fs-lg-5 bg-white text-success w-100 w-lg-auto"
                      to="/login"
                    >
                      Login{" "}
                    </Link>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <Link
                      className="btn fs-6 fs-lg-5 bg-white text-success w-100 w-lg-auto"
                      to="/signup"
                    >
                      Signup{" "}
                    </Link>{" "}
                  </li>{" "}
                </>
              ) : (
                <>
                  {" "}
                  {userName && (
                    <li className="nav-item d-flex align-items-center me-3 mb-2 mb-lg-0">
                      {" "}
                      <span className="text-white fs-5 fw-semibold p-2">
                        Welcome, {userName}!{" "}
                      </span>{" "}
                    </li>
                  )}
                
                  <li className="nav-item mx-lg-2 mb-2 mb-lg-0">
                    <Link
                      className="btn fs-6 fs-lg-5 bg-white text-success w-100 w-lg-auto"
                      to="/myorders"
                    >
                      📜 My Orders
                    </Link>
                  </li>
                  {/* END OF NEW LINK */}{" "}
                  <li className="nav-item mx-lg-2 mb-2 mb-lg-0">
                    {" "}
                    <button
                      className="btn fs-6 fs-lg-5 bg-white text-success w-100 w-lg-auto position-relative"
                      onClick={() => setShowCart(true)}
                    >
                      🛒 My Cart{" "}
                      {totalQty > 0 && (
                        <span
                          className="badge rounded-pill bg-danger text-white position-absolute top-0 start-100 translate-middle"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {" "}
                          {totalQty}{" "}
                        </span>
                      )}{" "}
                    </button>{" "}
                  </li>
                  {" "}
                  <li className="nav-item">
                    {" "}
                    <button
                      className="btn fs-6 fs-lg-5 bg-white text-success w-100 w-lg-auto"
                      onClick={handleLogout}
                    >
                      🚪 Logout{" "}
                    </button>{" "}
                  </li>{" "}
                </>
              )}{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
      {showCart && <CartModal onClose={() => setShowCart(false)} />}{" "}
    </>
  );
};

export default Navbar;
