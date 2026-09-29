import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products() {
  return (
    <div className="products-page">
      <div className="products-header">
        <p className="small-title">OUR COLLECTION</p>
        <h1>Featured Products</h1>
        <p>Premium perfumes at affordable prices.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;