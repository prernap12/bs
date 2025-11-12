import React, { useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";
import Books from "./Book";
import Contact from "./ContactMsg";
import UserData from "./User";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h1>Admin Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card"><h3>Total Books</h3><p>120</p></div>
              <div className="stat-card"><h3>Total Users</h3><p>300</p></div>
              <div className="stat-card"><h3>Total Orders</h3><p>95</p></div>
              <div className="stat-card"><h3>Revenue</h3><p>$12,450</p></div>
            </div>
          </div>
        );
      case "books":
        return <Books />;
      case "users":
        return <UserData />;
      case "orders":
        return <h1>📦 Manage Orders</h1>;
      case "logout":
        return <h1>🚪 You have been logged out</h1>;
         case "message":
        return <Contact />;
        
      default:
        return <h1>Welcome!</h1>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setActivePage={setActivePage} />
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
