import React, { useState } from "react";
import "../index.css";
import HandsImage from '../img/off.svg';

const DiscountForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsSubmitted(true); 
  };

  return (
  <div className="discount-section">
  <div className="discount-image">
    <img src={HandsImage} alt="Hands with plants" />
  </div>


  <div className="discount-content">
    <h1 className="discount-title">5% off on the first order</h1>
    <form className="discount-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" className="discount-input" required />
      <input type="text" placeholder="Phone number" className="discount-input" required />
      <input type="email" placeholder="Email" className="discount-input" required />
      <button
        type="submit"
        className={`discount-button ${isSubmitted ? "submitted" : ""}`}
        disabled={isSubmitted}
      >
        {isSubmitted ? "Request Submitted" : "Get a discount"}
      </button>
    </form>
  </div>
</div>
  );
};

export default DiscountForm;
