import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">
        ShopZone
      </Link>

      <div className="nav-links">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>

        {/* NAYA TAB */}
        <Link to="/orders">Orders</Link>

        <Link to="/cart" className="cart-link">
          Cart 🛒
          <span className="cart-count">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;