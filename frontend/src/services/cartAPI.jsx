import axios from "axios";

const API_BASE = "http://localhost:3000/api/cart";

// GET cart
export const getCart = (token) =>
  axios.get(API_BASE, { headers: { Authorization: `Bearer ${token}` } });

// ADD to cart
export const addToCart = (productId, price, token) =>
  axios.post(
    API_BASE,
    { productId, price, quantity: 1 },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// UPDATE quantity
// cartAPI.jsx
export const updateQty = async (productId, quantity) => {
  try {
    const response = await fetch(`/api/cart/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update quantity");
    }
    return await response.json();
  } catch (error) {
    console.error("updateQty error:", error);
    throw error;
  }
};

// REMOVE item
export const removeItem = (productId, token) =>
  axios.delete(`${API_BASE}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
