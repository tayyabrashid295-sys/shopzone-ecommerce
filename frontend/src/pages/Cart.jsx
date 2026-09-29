import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-box">
          <div className="empty-icon">🛒</div>

          <h2>Your Cart is Empty</h2>

          <p>
            Add some products to your cart and come back here.
          </p>

          <Link to="/products" className="continue-btn">
            Shop Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <p className="small-title">YOUR SHOPPING</p>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => {
            const itemPrice = Number(item.price || 0);

            return (
              <div className="cart-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <p>
                    Rs. {itemPrice.toLocaleString()}
                  </p>

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>
                    Rs.{" "}
                    {(
                      itemPrice * item.quantity
                    ).toLocaleString()}
                  </strong>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              Rs. {totalPrice.toLocaleString()}
            </strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>

          <hr />

          <div className="total-row">
            <span>Total</span>

            <strong>
              Rs. {totalPrice.toLocaleString()}
            </strong>
          </div>

          {/* CHANGE: ab ye navigate karega /checkout par */}
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;