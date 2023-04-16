import React, { useState } from "react";
import "./Cart.css";
import Menu from "../Menu.js";

const Cart = ({ items }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.img} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <Menu items={items} addToCart={addToCart} />
    </div>
  );
};

export default Cart; 





