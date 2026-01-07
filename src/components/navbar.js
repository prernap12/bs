import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaHeart,
  FaUser,
  FaBook,
  FaHome,
  FaList,
  FaTags,
  FaStore,
  FaChevronDown,
} from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import Login from "./login";
import Cart from "./Cart";
import axios from "axios";
import "../App.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCart, setShowCart] = useState(false);

  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const dropdownRef = useRef(null);

  // ---------------------- LOGIN / DROPDOWN TOGGLE -----------------------
  const toggleLoginOrDropdown = () => {
    if (username) {
      setShowDropdown((prev) => !prev);
    } else {
      setShowLogin((prev) => !prev);
      document.body.classList.toggle("login-active");
    }
  };

  // ---------------------- SEARCH SUBMIT -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowSearchPopup(true);
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/books/search",
        { params: { book: searchValue } }
      );

      // FIX: backend returns an array, not response.data.books
      setSearchResults(response.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong while searching.");
    }

    setLoading(false);
  };

  // ---------------------- CLOSE DROPDOWN WHEN CLICKING OUTSIDE -----------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------------- LOAD USERNAME -----------------------
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [showLogin]);

  // ---------------------- LOGOUT -----------------------
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    setShowDropdown(false);
  };

  return (
    <div>
      <header className="header">
        <div className="header_one">
          <a href="/" className="logo">
            <FaBook /> Newroad Bookstore
          </a>

          {/* 🔍 SEARCH BAR */}
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              id="search-box"
              placeholder="search here"
            />
            <label htmlFor="search-box">
              <FaSearch />
            </label>
          </form>

          {/* ❤️ CART + USER */}
          <div className="icons">
            <a href="/#">
              <FaHeart />
            </a>
            <div onClick={() => setShowCart(true)}>
              <FaCartArrowDown />
            </div>

            <div
              id="login-btn"
              className={`user-btn ${showDropdown ? "open" : ""}`}
              onClick={toggleLoginOrDropdown}
              ref={dropdownRef}
            >
              {username ? (
                <span className="navbar-username">
                  Hi, {username}
                  <FaChevronDown className="dropdown-arrow" />
                </span>
              ) : (
                <FaUser />
              )}

              {username && showDropdown && (
                <div className="user-dropdown">
                  <button onClick={() => alert("Open Profile Component")}>
                    My Profile
                  </button>
                  <button onClick={() => alert("Open Orders Component")}>
                    My Orders
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="header_two">
          <div className="navbar">
            <a href="/">Home</a>
            <a href="/featured">Featured</a>
            <a href="/arrivals">Arrivals</a>
            <a href="/nepali">Nepali</a>
          </div>
          <div className="right_nb">
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </header>

      {/* BOTTOM NAVBAR */}
      <div className="bottom-navbar">
        <a href="/#">
          <FaHome />
        </a>
        <a href="/#">
          <FaList />
        </a>
        <a href="/#">
          <FaTags />
        </a>
        <a href="/#">
          <FaStore />
        </a>
      </div>

      {/* LOGIN + CART */}
      {showLogin && <Login onClose={toggleLoginOrDropdown} />}
      {showCart && <Cart onClose={() => setShowCart(false)} />}

      {/* ---------------------- POPUP SEARCH RESULT ---------------------- */}
      {showSearchPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowSearchPopup(false)}
        >
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-title">Search Results</h2>

            {loading && <p className="popup-loading">Loading...</p>}
            {error && <p className="popup-error">{error}</p>}

            {searchResults.length === 0 && !loading && (
              <p className="popup-noresults">No books found.</p>
            )}

            <div className="popup-results">
              {searchResults.map((book) => (
                <div key={book._id} className="popup-item">
                  <img
                    src={
                      book.image
                        ? `http://localhost:5000/uploads/${book.image}`
                        : "/placeholder.jpg"
                    }
                    alt={book.name}
                    className="popup-img"
                  />
                  <div>
                    <h3 className="popup-item-title">{book.name}</h3>
                    <p className="popup-item-author">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="popup-close"
              onClick={() => setShowSearchPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
