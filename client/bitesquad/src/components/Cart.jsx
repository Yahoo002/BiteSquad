
import React, { useState } from "react";
import "./Cart.css";

const Cart = ({ items }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const clearCart = () => {
    setTotalPrice(0);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  };

  const confirmPurchase = () => {
    alert("Items purchased");
    clearCart();
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.img} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: ${totalPrice}</p>
        <p> <button onClick={calculateTotalPrice}>Calculate Total Price</button></p>
        <button onClick={confirmPurchase}>Confirm Purchase</button>
      </div>
    </div>
  );
};

export default Cart;
