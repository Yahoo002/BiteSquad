import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
import logo from "./logo.png";
import MenuX from "./components/Menu";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Cart from "./components/Cart";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

const App = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);
  const [pageId, setPageId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMenuItems(filteredItems);
  }, [searchTerm]);
  function clearCart() {
    setCartItems([]);
  }
  function addToCart(item) {
    setCartItems([...cartItems, item]);
  }

  return (
    <main>
      <MenuX changePageId={setPageId} />
      {pageId === 0 ? (
        <section className="menu section">
          <div className="title">
            <img src={logo} alt="logo" className="logo" />
            <h2>Menu List</h2>
            <div className="underline"></div>
          </div>
          <input
            type="text"
            placeholder="Search items"
            value={searchTerm}
            onChange={handleSearch}
          />
          <p>
            {" "}
            <button onClick={clearCart}>Clear Cart</button>
          </p>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            filterItems={filterItems}
          />
          <Menu
            items={menuItems}
            addToCart={(item) => {
              addToCart(item);
            }}
          />
        </section>
      ) : pageId === 1 ? (
        <section className="login section">
          <LoginPage />
        </section>
      ) : pageId === 2 ? (
        <section className="Register section">
          <RegisterPage />
        </section>
      ) : (
        <section className="Cart section">
          <Cart items={cartItems} />
        </section>
      )}
    </main>
  );
};

export default App;
