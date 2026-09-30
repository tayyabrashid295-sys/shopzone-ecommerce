import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    if (!token) {
      setError("Please login to see your orders");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm("Kya aap is order ko cancel karna chahte hain?");
    if (!confirmCancel) return;

    try {
      setCancellingId(orderId);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Order cancel nahi ho saka");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <p className="empty-orders">Loading orders...</p>;
  if (error) return <p className="empty-orders">{error}</p>;

  if (orders.length === 0) {
    return <p className="empty-orders">You have no orders yet.</p>;
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>
            Status: <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
          </p>
          <p>Total: Rs. {order.totalPrice.toLocaleString()}</p>

          {order.items.map((item, i) => (
            <div key={i} className="order-item">
              <img src={item.image} alt={item.name} />
              <span>{item.name} × {item.quantity}</span>
            </div>
          ))}

          {order.status === "Pending" || order.status === "Processing" ? (
            <button
              className="cancel-order-btn"
              onClick={() => handleCancel(order._id)}
              disabled={cancellingId === order._id}
            >
              {cancellingId === order._id ? "Cancelling..." : "Cancel Order"}
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Orders;