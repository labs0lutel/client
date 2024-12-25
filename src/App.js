import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Sale from "./components/Sale";
import AllCategories from "./components/AllCategories";
import AllSale from "./components/AllSale";
import DiscountForm from "./components/DiscountForm";
import ProductsByCategory from "./components/ProductsByCategory";
import CartPage from "./components/CartPage";
import ProductPage from "./components/ProductPage";
import { CartProvider } from "./contexts/CartContext";
import NotFound from "./components/NotFound";

class App extends React.Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <div className="wrapper">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Categories showAll={false} />
                    <DiscountForm />
                    <Sale />
                  </>
                }
              />
              <Route path="/all-categories" element={<AllCategories />} />
              <Route path="/all-sale" element={<AllSale />} />
              <Route
                path="/products/:categoryId"
                element={<ProductsByCategory />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    );
  }
}

export default App;
