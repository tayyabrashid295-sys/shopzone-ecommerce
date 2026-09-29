import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-link">
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-info">
        <p className="product-category">{product.fragrance}</p>

        <h2>{product.name}</h2>

        <p className="product-price">
          Rs. {product.price.toLocaleString()}
        </p>

        <div className="product-actions">
          <Link to={`/product/${product._id}`} className="view-btn">
            View Details
          </Link>

          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;