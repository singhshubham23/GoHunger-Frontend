import React from "react";

const Carousel = ({ searchTerm, setSearchTerm }) => {
  const slides = [
    {
      id: 1,
      src: "https://imgs.search.brave.com/QW52QTZ_SjHbN1w3aPKnup2w7gSJFYwj4QuvL45en7c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNzc5/NTY3MS5qcGc",
      alt: "Chilli Paneer",
    },
    {
      id: 2,
      src: "https://imgs.search.brave.com/tp4bLr1sGbC3mbF5Lf8FnOjIZ1P7go_bIsG2A3tIV8k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA0/NTk5NzY1L3Bob3Rv/L2NoaWNrZW4tYmly/eWFuaS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9VkZvZE5O/Q29nUFF2SER0Q2Ey/OHRvMFJCTUwzUDVl/N29JMGJMdVQwdHNw/RT0",
      alt: "Biryani",
    },
    {
      id: 3,
      src: "https://imgs.search.brave.com/aiDWnXJg2pbEzGSzTVXemLWUfGv1l8bMVm7J8PBM_zI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVncmVjaXBlc29m/aW5kaWEuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE0LzEx/L3ZlZy1jaG93bWVp/bi1ub29kbGVzLXJl/Y2lwZTI0LmpwZw",
      alt: "Veg Chowmein",
    },
  ];

  return (
    <div
      className="position-relative"
      style={{
        marginTop: "0",
        paddingTop: "0",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #c8e6c9, #ffffff)",
      }}
    >
      {/* Carousel */}
      <div
        id="carouselExampleInterval"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: "60vh", // default height
                  minHeight: "400px",
                  background:
                    "linear-gradient(to right, #ffffff, #a5d6a7, #4caf50)",
                }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="img-fluid"
                  style={{
                    width: "90%",
                    maxWidth: "700px",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            style={{ filter: "invert(1)" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            style={{ filter: "invert(1)" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Search Bar Overlay */}
      <div
        className="position-absolute start-50 translate-middle-x w-100 px-3"
        style={{ top: "65%", zIndex: 10 }}
      >
        <div
          className="d-flex bg-white rounded-pill shadow px-3 py-2 mx-auto align-items-center"
          style={{
            maxWidth: "600px",
            border: "2px solid #4caf50",
          }}
        >
          <input
            type="text"
            className="form-control border-0 fs-5"
            placeholder="Search for delicious food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-success rounded-pill px-4 fw-semibold"
            type="button"
            onClick={() => setSearchTerm(searchTerm.trim())}
          >
            Search
          </button>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>
        {`
          @media (max-width: 768px) {
            .carousel-item div {
              height: 45vh !important;
            }
            .carousel-item img {
              max-width: 90% !important;
              height: auto !important;
            }
            .position-absolute {
              top: 60% !important;
            }
          }
          @media (max-width: 480px) {
            .carousel-item div {
              height: 35vh !important;
            }
            .carousel-item img {
              max-width: 95% !important;
              height: auto !important;
            }
            .position-absolute {
              top: 55% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
