import React, { useState } from "react";
import axios from "axios";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import "./contactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    console.log("📤 Sending formData:", formData); // Debug log

    try {
      await axios.post(
        "http://localhost:5000/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contact Us</h1>

        {/* Contact Info */}
        <div className="contact-info">
          <p><FaPhone className="icon" /> +977 9876543210</p>
          <p><FaEnvelope className="icon" /> contact@company.com</p>
          <p><FaMapMarkerAlt className="icon" /> Kathmandu, Nepal</p>
        </div>

        {/* Contact Form */}
        <h2 className="form-title">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
          <button type="submit" className="form-button">
            Send Message
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}

        {/* Social Media */}
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=100083454636471" target="_blank" rel="noreferrer"><FaFacebook size={24} /></a>
          <a href="https://www.tiktok.com/@newroadbooks" target="_blank" rel="noreferrer"><FaTiktok size={24} /></a>
          <a href="https://www.instagram.com/newroadbookstore/" target="_blank" rel="noreferrer"><FaInstagram size={24} /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
