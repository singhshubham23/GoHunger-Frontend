import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      console.error("User email not found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/myOrderData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.orderData) {
        setOrderData(data.orderData);
      }
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5 fs-4 text-secondary">
        Loading Orders...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="container my-5">
        <h1 className="text-success mb-4 border-bottom pb-2">
          My Order History
        </h1>

        {orderData.length === 0 ? (
          <div className="text-center fs-5 text-muted">
            You haven't placed any orders yet.
          </div>
        ) : (
          orderData
            .slice(0)
            .reverse()
            .map((order) => (
              <div
                key={order._id || order.orderId}
                className="mb-4 p-3 border border-success rounded shadow-sm bg-white"
              >
                <h4 className="text-primary mb-3 border-bottom pb-2">
                  Order Date:{" "}
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "N/A"}
                </h4>

                {order.orders &&
                  Array.isArray(order.orders) &&
                  order.orders.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="d-flex justify-content-between align-items-center py-2"
                      style={{ borderBottom: "1px dotted #ccc" }}
                    >
                      <div className="fs-5 fw-bold" style={{ color: "black" }}>
                        {item.name}
                      </div>

                      <div className="text-end" style={{ color: "#555" }}>
                        Qty: {item.qty} | Size: {item.size} <br />
                        Price: ₹{item.price}
                      </div>
                    </div>
                  ))}

                {order.totalAmount && (
                  <div className="mt-3 fs-5 fw-bold text-end text-danger pt-2 border-top border-dark">
                    Total Paid: ₹{order.totalAmount}
                  </div>
                )}
              </div>
            ))
        )}
      </div>
      <Footer />
    </div>
  );
}
