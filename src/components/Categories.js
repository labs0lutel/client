import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Categories = ({ showAll }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке категорий:", err);
        setError("Не удалось загрузить категории.");
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryId, categoryTitle) => {
    navigate(`/products/${categoryId}`, { state: { categoryTitle } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1 className="categories-title">Categories</h1>
        <div className="categories-line"></div>
        {!showAll && (
          <button
            onClick={() => navigate("/all-categories")}
            className="all-categories-button"
          >
            All categories
          </button>
        )}
      </div>
      <div className="categories-grid">
        {displayedCategories.map((category) => (
          <div
            key={category.id}
            className="category-item"
            onClick={() => handleCategoryClick(category.id)} 
          >
            <img
              src={`http://localhost:3333/public${category.image}`}
              alt={category.title || "Untitled"}
              className="category-image"
            />
            <h3 className="category-title">{category.title || "Untitled"}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
