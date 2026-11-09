import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;


import Navbar from './components/navigationbar';
import Footer from './components/footer';
import Terms from './components/terms';

import Home from './Pages/home';
import Explore from './Pages/explore';
import ContactUs from './Pages/contactus';
import MyHistory from './Pages/myhistory';
import Login from './Pages/login';
import Register from './Pages/register';
import AdminDashboard from './Pages/admindashboard';
import VisionMission from './Pages/VisionMission';
import OurStory from './Pages/OurStory';

import Reports from './Pages/reports';





import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">

        
        <Navbar />

        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />

            
            <Route
              path="/vision-mission"
              element={<VisionMission />}
            />

            <Route
              path="/our-story"
              element={<OurStory />}
            />

            <Route path="/contact" element={<ContactUs />} />
            <Route path="/history" element={<MyHistory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route 
 path="/admin/dashboard/reports" 
 element={<AdminDashboard defaultTab="reports" />}
/>
            
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/terms" element={<Terms />} />
           
           


            
            
            
          </Routes>
        </main>

<Footer/>

      </div>
    </Router>
  );
}

export default App;