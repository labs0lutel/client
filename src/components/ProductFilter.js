import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import ProductCard from "./ProductCard"; 



const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    discountOnly: false,
    sortOrder: "default",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3333/products/all")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.priceFrom) {
      filtered = filtered.filter((product) => product.price >= filters.priceFrom);
    }
    if (filters.priceTo) {
      filtered = filtered.filter((product) => product.price <= filters.priceTo);
    }
    if (filters.discountOnly) {
      filtered = filtered.filter(
        (product) => product.discont_price && product.discont_price < product.price
      );
    }
    if (filters.sortOrder === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h1 className="filter-title">All Products</h1>
      </div>

      <div className="filter-panel">
        <div className="filter-price">
          <span>Price</span>
          <input
            type="number"
            placeholder="from"
            value={filters.priceFrom}
            onChange={(e) => handleFilterChange("priceFrom", e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            value={filters.priceTo}
            onChange={(e) => handleFilterChange("priceTo", e.target.value)}
          />
        </div>

        <div className="filter-discount">
          <label>
            Discounted items
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={() =>
                handleFilterChange("discountOnly", !filters.discountOnly)
              }
            />
          </label>
        </div>

        <div className="filter-sort">
          <label htmlFor="sort-select">Sorted</label>
          <select
            id="sort-select"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
          >
            <option value="default">by default</option>
            <option value="price-low">price: low-high</option>
            <option value="price-high">price: high-low</option>
          </select>
        </div>
      </div>

      <div className="sale-container">
        <div className="sale-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;