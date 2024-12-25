import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      {product.discont_price && (
              <div className="discount-tag">
                -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
              </div>
            )}
      <div className="product-card-overlay">
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); 
            addToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
      <img
        src={`http://localhost:3333/public${product.image}`}
        alt={product.title}
        className="product-image"
      />
      <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <div className="product-pricing">
              <span className="current-price">${product.discont_price || product.price}</span>
              {product.discont_price && <span className="old-price">${product.price}</span>}
            </div>
        </div>
    </div>
  );
};

export default ProductCard;
