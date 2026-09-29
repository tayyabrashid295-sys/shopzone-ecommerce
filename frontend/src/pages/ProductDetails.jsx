import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-box">
          <h2>Product not found</h2>
          <p>Ye product maujood nahi hai.</p>
          <Link to="/products" className="continue-btn">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>

        <h3>Brand: Tayyab</h3>

        <p className="description">{product.description}</p>

        <h2 className="price">Rs. {product.price.toLocaleString()}</h2>

        <p>
          <strong>Category:</strong> Perfume
        </p>
        <p>
          <strong>Fragrance:</strong> {product.fragrance}
        </p>
        <p>
          <strong>Size:</strong> {product.size}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button
          type="button"
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;