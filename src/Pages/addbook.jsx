import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addbook.css';

const AddBook = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    book_id: '', book_title: '', isbn: '',
    author: '', quantity: '', category: '',
    publisher: '', publish_year: ''
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/book-categories');
    console.log(response.data);
    setCategories(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClear = () => {
    setFormData({
      book_id: '', book_title: '', isbn: '',
      author: '', quantity: '', category: '',
      publisher: '', publish_year: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.book_id || !formData.book_title || !formData.author || !formData.quantity || !formData.category || !formData.publisher || !formData.publish_year) {
      alert("Please fill in the details!");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/books', formData);
      fetchBooks();
      handleClear();
      alert("Book was successfully added!");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      alert("Book addition failed.");
    }
  };

  return (
    <div className="addbook-page-wrapper">
      {/* Form Container */}
      <div className="addbook-form-container">
        <h2>Add New Book</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input name="book_id" value={formData.book_id} placeholder="Book ID" onChange={handleChange} required />
          <input name="author" value={formData.author} placeholder="Author Name" onChange={handleChange} required />
          <input name="book_title" value={formData.book_title} placeholder="Book Title" onChange={handleChange} required />
          <input name="publisher" value={formData.publisher} placeholder="Publisher" onChange={handleChange} required />
          <input type="number" name="quantity" value={formData.quantity} placeholder="Quantity" onChange={handleChange} min="1" required />
          <input name="isbn" value={formData.isbn} placeholder="ISBN" onChange={handleChange} required />

          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
            ))}
          </select>

          <select name="publish_year" value={formData.publish_year} onChange={handleChange} required>
            <option value="">-- Select Publish Year --</option>
            {Array.from({ length: new Date().getFullYear() - 1900 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>

          <div className="form-actions">
            <button type="submit" className="add-btn">ADD BOOK</button>
            <button type="button" className="clear-btn" onClick={handleClear}>CLEAR</button>
          </div>
        </form>
      </div>

      {/* Table Container - වගුව සඳහා නිල් පැහැති කොටුව ලබා දීම */}
      <div className="book-table-container">
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Book List</h2>
        <table className="book-table">
          <thead>
            <tr>
              <th>BOOK ID</th>
              <th>TITLE</th>
              <th>ISBN</th>
              <th>AUTHOR</th>
              <th>QUANTITY</th>
              <th>CATEGORY</th>
              <th>PUBLISHER</th>
              <th>PUBLISH YEAR</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.book_id}</td>
                <td>{book.book_title}</td>
                <td>{book.isbn}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.category}</td>
                <td>{book.publisher}</td>
                <td>{book.publish_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddBook;