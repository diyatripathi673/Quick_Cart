import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Home.css";
import { addToCart } from "../services/cartAPI";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchProducts();
  }, []);

  // 🔹 Add / Update product
  const handleSubmit = async () => {
    if (!name || !price) return alert("Fill all fields");

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/products/${editId}`,
          { name, price },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:3000/products",
          { name, price },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setName("");
      setPrice("");
      fetchProducts();
    } catch {
      alert("Operation failed");
    }
  };

  // 🔹 Edit
  const handleEdit = (p) => {
    setName(p.name);
    setPrice(p.price);
    setEditId(p._id);
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await axios.delete(`http://localhost:3000/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🛒 ADD TO CART
  // 🛒 ADD TO CART
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      // Pass productId and price
      await addToCart(product._id, product.price, token);
      alert("Product added to cart 🛒");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="home-container">
      {/* 🔷 NAVBAR */}
      <div className="navbar">
        <h2 className="logo">QuickCart</h2>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/cart">🛒 Cart</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* 🔷 DESCRIPTION */}
      <div className="app-description">
        Welcome to <b>QuickCart</b> – Simple shopping with cart system 🚀
      </div>

      {/* 🔷 ADD / UPDATE PRODUCT */}
      <div className="add-product">
        <h4>{editId ? "Update Product" : "Add Product"}</h4>

        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
      </div>

      {/* 🔷 PRODUCTS */}
      <div className="product-grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>

            <div className="actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
              <button className="cart-btn" onClick={() => handleAddToCart(p)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
