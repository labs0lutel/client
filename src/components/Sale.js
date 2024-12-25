import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../index.css";

const Sale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3333/products/all")
      .then((response) => {
        const discountedProducts = response.data.filter(
          (product) => product.discont_price && product.discont_price < product.price
        );
        setSaleProducts(discountedProducts.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sale-container">
      <div className="sale-header">
        <h1 className="sale-title">Sale</h1>
        <div className="sale-line"></div>
        <button className="all-sale-button" onClick={() => navigate("/all-sale")}>
          All Sale
        </button>
      </div>

      <div className="sale-grid">
        {saleProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)} 
          >
            {product.discont_price && (
              <div className="discount-tag">
                -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
              </div>
            )}

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sale;
