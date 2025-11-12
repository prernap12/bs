import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import "./Cart.css";

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/addtocart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/addtocart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId: id },
      });

      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>My Cart</h2>
          <FaTimes className="close-cart" onClick={onClose} />
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={`http://localhost:5000/uploads/${item.book.image}`}
                  alt={item.book.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4>{item.book.name}</h4>
                  <p>
                    Rs.{item.book.price - (item.book.price * item.book.discount) / 100} x {item.quantity}
                  </p>
                  <small>by {item.book.author}</small>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-footer">
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
