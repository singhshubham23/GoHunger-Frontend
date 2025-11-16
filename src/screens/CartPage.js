// import React from "react";
// import { useCart, useCartDispatch } from "../components/ContextReducer";

// const CartPage = () => {
//   const cart = useCart();
//   const dispatch = useCartDispatch();

//   const totalPrice = cart.reduce(
//     (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   const handleRemove = (item) => {
//     dispatch({ type: "REMOVE", payload: { _id: item._id, size: item.size } });
//   };

//   const handleUpdateQty = (item, quantity) => {
//     dispatch({
//       type: "UPDATE_QTY",
//       payload: { _id: item._id, size: item.size, quantity },
//     });
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="text-success mb-4">🛒 My Cart</h2>

//       {cart.length === 0 ? (
//         <div className="alert alert-info text-center fs-5">Your cart is empty! 🍽️</div>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={`${item._id}-${item.size}`}
//               className="card mb-3 shadow-sm border-0"
//             >
//               <div className="row g-0 align-items-center">
//                 <div className="col-md-2">
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="img-fluid rounded-start"
//                     style={{ height: "100px", objectFit: "cover" }}
//                   />
//                 </div>

//                 <div className="col-md-7">
//                   <div className="card-body">
//                     <h5 className="card-title mb-1">{item.name}</h5>
//                     <p className="card-text mb-1">
//                       Size: <span className="fw-bold">{item.size}</span>
//                     </p>
//                     <p className="card-text mb-1">
//                       Quantity:{" "}
//                       <select
//                         name="quantity"
//                         value={item.quantity}
//                         onChange={(e) => handleUpdateQty(item, Number(e.target.value))}
//                         className="form-select d-inline w-auto ms-2"
//                       >
//                         {Array.from({ length: 6 }, (_, i) => (
//                           <option key={i + 1} value={i + 1}>
//                             {i + 1}
//                           </option>
//                         ))}
//                       </select>
//                     </p>
//                     <p className="card-text text-success fw-bold">
//                       ₹{(Number(item.price) || 0) * (Number(item.quantity) || 0)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="col-md-3 text-end pe-3">
//                   <button className="btn btn-danger" onClick={() => handleRemove(item)}>
//                     ❌ Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="text-end mt-4">
//             <h4>
//               Total: <span className="text-success">₹{totalPrice}</span>
//             </h4>
//             <button className="btn btn-success mt-2">✅ Place Order</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React, { useState } from "react";
import { useCart, useCartDispatch } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const handleRemove = (item) => {
    dispatch({ type: "REMOVE", payload: { _id: item._id, size: item.size } });
  };

  const handleUpdateQty = (item, quantity) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: { _id: item._id, size: item.size, quantity },
    });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      const email = localStorage.getItem("userEmail");
      const authToken = localStorage.getItem("authToken"); // <-- Get authToken for security

      // *** IMPROVED AUTHENTICATION CHECK ***
      if (!email || !authToken) { 
        setLoading(false);
        setErrorMessage("Please log in before placing an order.");
        setShowErrorModal(true);
        return;
      }

      if (!cart || cart.length === 0) {
        setLoading(false);
        setErrorMessage("Your cart is empty.");
        setShowErrorModal(true);
        return;
      }

      const orderData = cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        size: item.size,
      }));

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          orderData,
          totalAmount: totalPrice,
        }),
      });

      let parsed;
      try {
        parsed = await res.json();
      } catch (jsonErr) {
        parsed = await res.text();
      }

      if (!res.ok) {
        const msg =
          (parsed && parsed.message) || (typeof parsed === "string" && parsed) || `HTTP ${res.status}`;
        setErrorMessage(`Server error: ${msg}`);
        setShowErrorModal(true);
        setLoading(false);
        return;
      }

      // Order Success Logic (Unchanged)
      setShowModal(true);
      dispatch({ type: "CLEAR" });

      // auto close modal after 3s and redirect
      setTimeout(() => {
        setShowModal(false);
        setLoading(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Network or JS error during place order:", err);
      setErrorMessage(err.message || "Unknown error");
      setShowErrorModal(true);
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-success mb-4">🛒 My Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center fs-5">Your cart is empty! 🍽️</div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={`${item._id}-${item.size}`} className="card mb-3 shadow-sm border-0">
              <div className="row g-0 align-items-center">
                <div className="col-md-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="card-text mb-1">
                      Size: <span className="fw-bold">{item.size}</span>
                    </p>
                    <p className="card-text mb-1">
                      Quantity:{" "}
                      <select
                        value={item.quantity}
                        onChange={(e) => handleUpdateQty(item, Number(e.target.value))}
                        className="form-select d-inline w-auto ms-2"
                      >
                        {Array.from({ length: 6 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p className="card-text text-success fw-bold">
                      ₹{(Number(item.price) || 0) * (Number(item.quantity) || 0)}
                    </p>
                  </div>
                </div>

                <div className="col-md-3 text-end pe-3">
                  <button className="btn btn-danger" onClick={() => handleRemove(item)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h4>
              Total: <span className="text-success">₹{totalPrice}</span>
            </h4>
            <button
              className="btn btn-success mt-2"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "✅ Place Order"}
            </button>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-3 shadow-lg border-0 rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title text-success w-100">🎉 Order Placed Successfully!</h5>
              </div>
              <div className="modal-body">
                <p>Your delicious food is on the way! 🚚🍽️</p>
                <p className="text-muted">You’ll be redirected shortly...</p>
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div
          className="modal fade show"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-3 shadow-lg border-0 rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger w-100">❌ Order Failed</h5>
              </div>
              <div className="modal-body">
                <p>{errorMessage}</p>
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => {
                    setShowErrorModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;