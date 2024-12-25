import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import basket from '../img/basket.svg';
import ProductFilter from "./ProductFilter";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { cart } = useCart(); 
  let [cartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <div>
        <img
          className="logo"
          src="/logo.svg"
          alt="Logo"
          style={{ width: "70px", height: "70px", cursor: "pointer" }}
          onClick={() => navigate("/")} 
        />
        <ul className="nav">
          <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Main Page</li> 
          <li onClick={() => navigate("all-categories")}>Categories</li>
          <li onClick={() => navigate("all-products")}>All products</li>
          <li onClick={() => navigate("all-sale")}>All sales</li>
        </ul>
        <div style={{ position: "relative", marginRight: "40px" }}>
          <img
            src={basket}
            alt="basket"
            style={{ width: "44px", height: "48px", cursor: "pointer" }}
            className="shop-cart-button"
            onClick={() => navigate("/cart")}
          />
          {totalItems > 0 && (
            <div
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "green",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {totalItems}
            </div>
          )}
        </div>
        {cartOpen && <div className="shop-cart"></div>}
      </div>
      {location.pathname === "/all-products" && (
        <div className="product-filter-wrapper">
          <ProductFilter />
        </div>
      )}
      {location.pathname === "/" && (
  <div className="presentation">
    <button className="check-out-btn">Check out</button>
  </div>
)}
    </header>
  );
}
