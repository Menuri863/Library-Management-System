import React, { useState } from 'react';
import './addcategory.css';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category_id: '',
    category_name: '',
    description: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/categories',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Category Added Successfully!');

        setFormData({
          category_id: '',
          category_name: '',
          description: '',
          status: 'Active'
        });
      } else {
        console.log(data);
        alert('Failed to Add Category');
      }
    } catch (error) {
      console.error(error);
      alert('Server Error');
    }
  };

  const handleClear = () => {
    setFormData({
      category_id: '',
      category_name: '',
      description: '',
      status: 'Active'
    });
  };

  return (
    <div className="cat-page-wrapper">
      <div className="cat-form-container">
        <h2>
          <span className="icon">🏷️</span> ADD CATEGORY
        </h2>

        <p className="sub-title">
          Add a new book category to the system
        </p>

        <form className="cat-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category ID</label>
            <input
              type="text"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              placeholder="Enter Category ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              placeholder="Enter Category Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
            ></textarea>
          </div>

          <div className="form-group status-group">
            <label>Status</label>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                />
                Active
              </label>

              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>

          <div className="cat-form-actions">
            <button type="submit" className="add-cat-btn">
              ADD CATEGORY
            </button>

            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;