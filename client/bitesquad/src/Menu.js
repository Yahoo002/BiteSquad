
import React from "react";

const Menu = ({ items, addToCart }) => {
  return (
    <div className="section-center">
      {items &&
        items.map((item) => {
          const { id, title, img, desc, price } = item;
          return (
            <article key={id} className="menu-item">
              <img src={img} alt={title} className="photo" />
              <div className="item-info">
                <header>
                  <h4>{title}</h4>
                  <h4 className="price">${price}</h4>
                </header>
                <p className="item-text">{desc}</p>
                <button className="add-to-cart" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default Menu;





