import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/User.css";

const API_URL = "http://localhost:5000/api/user";

const UserData = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="users-page">
      <h1>📋 Manage Users</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>📧 Email</th>
            <th>🏠 Address</th>
            <th>📞 Contact</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.contact}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found 🚫
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
