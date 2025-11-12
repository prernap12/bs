import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/Book.css";

const API_URL = "http://localhost:5000/api/books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    discount: "",
    description: "",
    image: null,
  });

  const fileInputRef = useRef(null); // 🔑 ref for file input

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("author", formData.author);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingBook) {
        await axios.put(`${API_URL}/${editingBook._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // reset form data
      setFormData({
        name: "",
        author: "",
        price: "",
        discount: "",
        description: "",
        image: null,
      });

      // 🔑 clear file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      name: book.name,
      author: book.author,
      price: book.price,
      discount: book.discount,
      description: book.description,
      image: null,
    });

    // also clear file input when editing
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="books-page">
      <h1>📚 Manage Books</h1>

      <form
        className="book-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef} // 🔑 attach ref here
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">{editingBook ? "Update" : "Add"} Book</button>
      </form>

      <table className="books-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                {book.image && (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.name}
                    width="50"
                  />
                )}
              </td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>₹{book.price}</td>
              <td>{book.discount}%</td>
              <td>{book.description}</td>
              <td>
                <button onClick={() => handleEdit(book)}>✏️ Edit</button>
                <button onClick={() => handleDelete(book._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
