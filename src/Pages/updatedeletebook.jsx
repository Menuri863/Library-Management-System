import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './updatedeletebook.css';

const UpdateDeleteBook = () => {
  const [books, setBooks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [updateField, setUpdateField] = useState('');
  const [updateValue, setUpdateValue] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to remove these books?')) {
      try {
        await axios.delete(`http://localhost:8000/api/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openUpdateModal = (book) => {
    setSelectedBook(book);
    setUpdateField('');
    setUpdateValue('');
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!updateField || !updateValue) {
      alert('Enter the field and value');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/books/${selectedBook.book_id}`,
        {
          [updateField]: updateValue
        }
      );

      alert('Updated successfully!');
      setShowModal(false);
      fetchBooks();

    } catch (error) {
      console.error(error);
      alert('An error occurred while updating!');
    }
  };

  return (
    <div className="main-page-wrapper">

      <div className="main-container">

        <h2
          style={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          Book Records
        </h2>

        <table className="book-table">
          <thead>
            <tr>
              <th>BOOK ID</th>
              <th>BOOK TITLE</th>
              <th>ISBN</th>
              <th>AUTHOR</th>
              <th>QUANTITY</th>
              <th>CATEGORY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.book_title}</td>
                <td>{book.isbn}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.category}</td>

                <td className="action-btns">
                  <button
                    className="edit-btn"
                    onClick={() => openUpdateModal(book)}
                  >
                    Update
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(book.book_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">

              <h3>Update Book</h3>

              <select
                value={updateField}
                onChange={(e) => setUpdateField(e.target.value)}
              >
                <option value="">Select Field</option>
                <option value="book_title">Book Title</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
                <option value="quantity">Quantity</option>
                <option value="category">Category</option>
              </select>

              <input
                type="text"
                placeholder="Enter New Value"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
              />

              <div className="modal-buttons">
                <button
                  className="edit-btn"
                  onClick={handleUpdate}
                >
                  Save
                </button>

                <button
                  className="delete-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default UpdateDeleteBook;