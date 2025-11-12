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

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [showCart, setShowCart] = useState(false);

  const dropdownRef = useRef(null);

  const toggleLoginOrDropdown = () => {
    if (username) {
      // If logged in → toggle dropdown
      setShowDropdown((prev) => !prev);
    } else {
      // If not logged in → show login modal
      setShowLogin((prev) => !prev);
      document.body.classList.toggle("login-active");
    }
  };

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Load username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [showLogin]);

  // ✅ Logout functionality
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

          {/* Search */}
          <form className="search-form">
            <input type="search" id="search-box" placeholder="search here" />
            <label htmlFor="search-box">
              <FaSearch />
            </label>
          </form>

          {/* Icons */}
          <div className="icons">
            <div id="search-btn">
              <FaSearch />
            </div>
            <a href="/#">
              <FaHeart />
            </a>
                <div onClick={() => setShowCart(true)}>
            <FaCartArrowDown />
          </div>

            {/* User / Username Dropdown */}
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

              {/* ✅ Dropdown Menu */}
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

        {/* Navbar links */}
        <div className="header_two">
          <div className="navbar">
            <a href="/">Home</a>
            <a href="/featured">Featured</a>
            <a href="/arrivals">Arrivals</a>
            <a href="/nepali">Nepaligit</a>
          </div>
          <div className="right_nb">
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </header>

      

      {/* Bottom Navbar */}
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

      {/* Conditionally render Login */}
      {showLogin && <Login onClose={toggleLoginOrDropdown} />}
         {/* ✅ Show Cart */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Navbar;
