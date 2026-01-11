import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔹 Fetch products on load
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch(() => {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🔹 Add Product
  const handleAddProduct = async () => {
    if (!newName || !newPrice) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/products",
        { name: newName, price: newPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts([...products, res.data]); // Update UI
      setNewName("");
      setNewPrice("");
      alert("Product added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="home-container">
      {/* 🔹 NAVBAR */}
      <div className="navbar">
        <h2 className="logo">Quick Cart</h2>
        <div className="nav-links">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>

      <div className="app-description">
        <p>
          QuickCart is a fast and user-friendly product management app built
          with React. Add, view, and manage products securely with a clean and
          responsive interface.
        </p>
      </div>

      {/* 🔹 BODY */}
      <h3>Welcome 🎉</h3>

      {!token && <p>Please login to see products</p>}

      {token && (
        <div className="add-product">
          <h4>Add Product</h4>
          <input
            type="text"
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      )}

      <div className="product-grid">
        {products.map((item, index) => (
          <div className="card" key={index}>
            <h4>{item.name}</h4>
            <p>₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
