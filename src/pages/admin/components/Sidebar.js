import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">📚 Bookstore</h2>
      <ul className="sidebar-menu">
        <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
        <li onClick={() => setActivePage("books")}>Books</li>
        <li onClick={() => setActivePage("users")}>Users</li>
        <li onClick={() => setActivePage("orders")}>Orders</li>
        <li onClick={() => setActivePage("message")}>Message</li>
           <li onClick={() => setActivePage("logout")}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
