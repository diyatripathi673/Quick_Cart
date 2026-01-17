import { useEffect, useState } from "react";
import { getCart, updateQty, removeItem } from "../services/cartAPI";
import "../Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token"); // Get token from storage

  // Load cart on component mount
  useEffect(() => {
    if (!token) {
      alert("Please login first");
      return; // Stop further execution if not logged in
    }
    loadCart();
  }, [token]);

  // Function to load cart
  const loadCart = async () => {
    try {
      const res = await getCart(token);
      setCart(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart. Please login.");
    }
  };

  // Update quantity handler
  const handleUpdateQty = async (productId, qty) => {
    if (!token) {
      alert("Please login first");
      return;
    }
    try {
      await updateQty(productId, qty, token);
      loadCart(); // Reload cart after update
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  // Remove item handler
  const handleRemoveItem = async (productId) => {
    if (!token) {
      alert("Please login first");
      return;
    }
    try {
      await removeItem(productId, token);
      loadCart(); // Reload cart after removing
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cart?.items?.length === 0 && (
        <p className="empty-cart">Your cart is empty 🛒</p>
      )}

      {cart?.items?.map((item) => (
        <div className="cart-item" key={item.productId}>
          {/* Left side */}
          <div className="cart-left">
            <h4>{item.name}</h4>
            <p className="cart-price">₹{item.price}</p>
          </div>

          {/* Quantity */}
          <button
            className="qty-btn"
            onClick={() =>
              updateQty(item.productId, item.quantity + 1, token).then(loadCart)
            }
          >
            +
          </button>

          <button
            className="qty-btn"
            onClick={() =>
              updateQty(item.productId, item.quantity - 1, token).then(loadCart)
            }
            disabled={item.quantity === 1}
          >
            -
          </button>

          {/* Remove */}
          <button
            className="remove-btn"
            onClick={() => handleRemoveItem(item.productId)}
          >
            Remove
          </button>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="cart-total">Total: ₹{cart.totalPrice}</div>
      )}
    </div>
  );
};

export default Cart;
