// import React, { useEffect } from "react";
// import { useCart, useCartDispatch } from "./ContextReducer";

// const CartModal = ({ onClose }) => {
//   const cart = useCart();
//   const dispatch = useCartDispatch();

//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden"; // stop scroll when modal open

//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);

//     return () => {
//       document.body.style.overflow = prev || "auto";
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [onClose]);

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   const handleRemove = (id, size) => {
//     dispatch({ type: "REMOVE", payload: { _id: id, size } });
//   };

//   // close if clicking the backdrop
//   const handleBackdropClick = (e) => {
//     if (e.target.getAttribute("data-backdrop") === "true") onClose();
//   };

//   return (
//     <div
//       className="modal show fade d-block"
//       tabIndex="-1"
//       data-backdrop="true"
//       onClick={handleBackdropClick}
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//     >
//       <div
//         className="modal-dialog modal-lg modal-dialog-centered"
//         onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside dialog
//       >
//         <div className="modal-content border-0 rounded-4 shadow">
//           <div className="modal-header bg-success text-white">
//             <h5 className="modal-title fw-bold">🛒 My Cart</h5>
//             <button
//               className="btn-close btn-close-white"
//               onClick={onClose}
//               aria-label="Close"
//             />
//           </div>

//           <div className="modal-body">
//             {cart.length === 0 ? (
//               <div className="alert alert-info text-center fs-5">
//                 Your cart is empty 🍽️
//               </div>
//             ) : (
//               <>
//                 {cart.map((item, index) => (
//                   <div
//                     key={`${item._id}-${item.size}-${index}`}
//                     className="d-flex align-items-center mb-3 border-bottom pb-2"
//                   >
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         objectFit: "cover",
//                         borderRadius: "5px",
//                       }}
//                     />
//                     <div className="ms-3 flex-grow-1">
//                       <h6 className="fw-semibold mb-1">{item.name}</h6>
//                       <p className="mb-1 text-muted small">
//                         Size: <b>{item.size}</b> | Qty: <b>{item.quantity}</b>
//                       </p>
//                       {item.description && (
//                         <p className="mb-0 text-muted small">{item.description}</p>
//                       )}
//                     </div>
//                     <div className="text-end">
//                       <p className="fw-bold text-success mb-2">
//                         ₹{(Number(item.price) || 0) * (Number(item.quantity) || 0)}
//                       </p>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleRemove(item._id, item.size)}
//                       >
//                         ❌ Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//                 <h5 className="text-end mt-3">
//                   Total: <span className="text-success">₹{totalPrice}</span>
//                 </h5>
//                 <button className="btn btn-success w-100 mt-2">✅ Place Order</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartModal;

import React, { useEffect } from "react";
import { useCart, useCartDispatch } from "./ContextReducer";
// Note: We use useNavigate from react-router-dom for proper navigation
import { useNavigate } from "react-router-dom"; 

const CartModal = ({ onClose }) => {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate(); // Hook to enable navigation

  useEffect(() => {
    // ... (rest of useEffect remains the same for modal behavior)
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // stop scroll when modal open

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev || "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const handleRemove = (id, size) => {
    dispatch({ type: "REMOVE", payload: { _id: id, size } });
  };

  // close if clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target.getAttribute("data-backdrop") === "true") onClose();
  };

  const handleGoToCheckout = () => {
    onClose();
    // Navigate to the full cart page for the final order placement
    navigate("/cart"); 
  };


  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      data-backdrop="true"
      onClick={handleBackdropClick}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside dialog
      >
        <div className="modal-content border-0 rounded-4 shadow">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title fw-bold">🛒 My Cart</h5>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            {cart.length === 0 ? (
              <div className="alert alert-info text-center fs-5">
                Your cart is empty 🍽️
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div
                    key={`${item._id}-${item.size}-${index}`}
                    className="d-flex align-items-center mb-3 border-bottom pb-2"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="fw-semibold mb-1">{item.name}</h6>
                      <p className="mb-1 text-muted small">
                        Size: <b>{item.size}</b> | Qty: <b>{item.quantity}</b>
                      </p>
                      {item.description && (
                        <p className="mb-0 text-muted small">{item.description}</p>
                      )}
                    </div>
                    <div className="text-end">
                      <p className="fw-bold text-success mb-2">
                        ₹{(Number(item.price) || 0) * (Number(item.quantity) || 0)}
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item._id, item.size)}
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                ))}

                <h5 className="text-end mt-3">
                  Total: <span className="text-success">₹{totalPrice}</span>
                </h5>
                {/* Updated Button to navigate to CartPage */}
                <button 
                    className="btn btn-success w-100 mt-2"
                    onClick={handleGoToCheckout}
                >
                    🛒 Go to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;