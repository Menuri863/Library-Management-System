import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './updatedeletecategory.css'; 

const UpdateDeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [updateField, setUpdateField] = useState('');
  const [updateValue, setUpdateValue] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) { 
      console.error("Error fetching categories:", error); 
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id) => {
    console.log("Category ID =", id);

    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:8000/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openUpdateModal = (cat) => {
    setSelectedCat(cat);
    setUpdateField('');
    setUpdateValue('');
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!updateField || !updateValue) {
      alert('Enter the field and the new value!');
      return;
    }
    
    const updatedData = { ...selectedCat, [updateField]: updateValue };

    try {
      await axios.put(
        `http://localhost:8000/api/categories/${selectedCat.category_id}`,
        updatedData
      );
      alert('Updated successfully!');
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert('Error: ' + (error.response?.data?.message || 'Update failed'));
    }
  };

  return (
    <div className="cat-page-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Book Categories
      </h2>
      
      <table className="cat-table">
        <thead>
          <tr>
            <th>CATEGORY ID</th>
            <th>CATEGORY NAME</th>
            <th>DESCRIPTION</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.category_id}>
              <td>{cat.category_id}</td>
              <td>{cat.category_name}</td>
              <td>{cat.description}</td>
              <td>
                <span className={`status-pill ${cat.status}`}>
                  {cat.status}
                </span>
              </td>

              <td className="action-container">
                <button
                  className="btn-update"
                  onClick={() => openUpdateModal(cat)}
                >
                  Update
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(cat.category_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Category</h3>

            <select
              value={updateField}
              onChange={(e) => setUpdateField(e.target.value)}
            >
              <option value="">Select Field</option>
              <option value="category_name">Category Name</option>
              <option value="description">Description</option>
              <option value="status">Status</option>
            </select>

            <input 
              type="text" 
              placeholder="Enter New Value" 
              value={updateValue} 
              onChange={(e) => setUpdateValue(e.target.value)} 
            />

            <div className="modal-buttons">
              <button className="btn-update" onClick={handleUpdate}>
                Save
              </button>

              <button
                className="btn-delete"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDeleteCategory;