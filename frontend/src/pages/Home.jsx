import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to ShopZone</h1>

        <p>Find the latest products at affordable prices.</p>

        <Link to="/products" className="shop-btn">
          Shop Now
        </Link>
      </div>
      
    

      
    </div>
    
  );
}

export default Home;
