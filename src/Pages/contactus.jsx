import React, { useState } from 'react';
import axios from 'axios';
import './contactus.css'; 

const ContactUs = () => {
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://127.0.0.1:8000/api/contact', formData);
        alert('Message sent successfully!');
        
        
        setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className="contact-container">
      <div className="contact-info-box">
        <h1>Get In Touch</h1>
        <p className="subtitle"></p>
        <p>Feel free to reach out to us!</p>
        
        <div className="contact-details">
          <p>📍 Veyangoda Public Library</p>
          <p>📞 033 2050 475</p>
          <p>📧 veyangodapubliclibrary@gmail.com</p>
          <p>🕒 Mon-Fri: 9AM - 5PM</p>
        </div>

        <div className="book-image-container">
          <img src="/Book.jpg" alt="Library Books" />
        </div>
      </div>

      <div className="contact-form-box">
        <h3>Contact Form</h3>
        
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
          
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
          
          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..." rows="6" required></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;