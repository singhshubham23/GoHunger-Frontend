import React, { useState } from "react";
import { useCartDispatch } from "./ContextReducer";

const Card = ({ _id, name, img, options, description }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Half");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useCartDispatch();

  const price =
    options && options.length > 0
      ? size === "Half"
        ? Number(options[0].Half)
        : Number(options[0].Full)
      : 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      payload: {
        _id,
        name,
        img,
        price,
        size,
        description,
        quantity,
      },
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div
      className="card shadow-sm mt-3 h-100 position-relative border-0"
      style={{ maxWidth: "20rem", borderRadius: "12px" }}
    >
      <img
        src={img}
        className="card-img-top"
        alt={name}
        style={{ height: "180px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
      />

      <div className="card-body d-flex flex-column bg-light rounded-bottom">
        <h5 className="card-title text-dark">{name}</h5>

        <p className="card-text text-muted small" style={{ minHeight: "40px" }}>
          {description}
        </p>

        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between">
            <select
              id={`qty-${_id}`}
              name="quantity"
              className="form-select form-select-sm w-auto"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              id={`size-${_id}`}
              name="size"
              className="form-select form-select-sm w-auto"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="Half">Half</option>
              <option value="Full">Full</option>
            </select>
          </div>

          <div className="mt-2 fw-bold text-success">
            Price: ₹{price * quantity}
          </div>

          <button className="btn btn-success w-100 mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        {showToast && (
          <div
            className="toast show position-absolute top-0 end-0 m-2 bg-success text-white"
            style={{ zIndex: 1000 }}
          >
            ✅ Item added to cart!
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
