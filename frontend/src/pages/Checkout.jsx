import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";


function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setError("");

    if (!form.fullName || !form.address || !form.city || !form.phone) {
      setError("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const items = cart.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/orders",
        { items, shippingInfo: form, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <p className="checkout-small-title">FINAL STEP</p>
        <h1 className="checkout-title">Checkout</h1>

        {error && <p className="checkout-error">{error}</p>}

        <div className="checkout-layout">
          {/* LEFT: SHIPPING FORM */}
          <div className="checkout-form">
            <h2>Shipping Details</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input
                name="fullName"
                placeholder="e.g. Mian Tayyab"
                
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                placeholder="House #, Street, Area"
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  placeholder="e.g. Lahore"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="03XX-XXXXXXX"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="checkout-summary-box">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cart.map((item) => (
                <div className="checkout-item" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <strong>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>

            <hr />

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>Rs. {totalPrice.toLocaleString()}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong className="free-tag">Free</strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {totalPrice.toLocaleString()}</strong>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;