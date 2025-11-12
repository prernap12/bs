import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ContactMsg.css";

const API_URL = "http://localhost:5000/api/contact";

const Contact = () => {
  const [contacts, setContact] = useState([]);

  // Fetch all contacts
  const fetchContact = async () => {
    try {
      const res = await axios.get(API_URL);
      setContact(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContact((prev) => prev.filter((c) => c._id !== id)); // update UI
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="maincontact-container">
      {contacts.map((contact) => (
        <div className="maincontact-card" key={contact._id}>
          <h3><strong>Name:</strong>  {contact.name}</h3>
          <p><strong>Email:</strong> {contact.email}</p>
          <p className="message"><strong>Message:</strong> {contact.message}</p>
          <button 
            className="delete-btn" 
            onClick={() => deleteContact(contact._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Contact;
