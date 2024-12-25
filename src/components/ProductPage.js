import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    fetch(`http://localhost:3333/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setProduct(data[0]);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error when uploading product data:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); 
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change)); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <img
        src={`http://localhost:3333/public${product.image}`}
        alt={product.title}
        className="product-images"
      />
      <div className="product-details">
        <h1 className="product-titles">{product.title}</h1>
        <div className="product-pricing">
          <span className="current-prices">
            ${product.discont_price || product.price}
          </span>
          {product.discont_price && (
            <span className="old-prices">${product.price}</span>
          )}
          {product.discont_price && (
            <div className="discount-tags">
              -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
            </div>
          )}
        </div>

        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
        </div>

        <p className="descrip">Description</p>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
