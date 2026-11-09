import React from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import './navigationbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    navigate('/', { replace: true });

   
  };
  const location = useLocation();

if (
  (userRole === "admin" || userRole === "staff") &&
  location.pathname.includes("dashboard")
) {
  return null;
}

  return (
    <nav className="navbar">
     <div className="logo">
  <img 
    src="/Library-Logo.png"
    alt="Library Logo"
    className="library-logo"
  />
  Veyangoda Public Library
</div>

 

      <ul className="nav-links">

        {userRole === 'admin' ? (

          <>
            <li className="admin-welcome">
              Welcome to Admin Panel
            </li>

            <li>
              <Link to="/admin/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="btn-yellow"
              >
                Logout
              </button>
            </li>
          </>

        ) : (

          <>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/explore">
                Explore
              </Link>
            </li>

            <li className="dropdown">
              <Link
                to="#"
                className="dropdown-title"
              >
                About Us
              </Link>

              <div className="dropdown-content">
                <Link to="/vision-mission">
                  Our Vision and Mission
                </Link>

                <Link to="/our-story">
                  Our Story
                </Link>
              </div>
            </li>

            <li>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>

            {userRole === 'member' && (
              <li>
                <Link to="/history">
                  My History
                </Link>
              </li>
            )}

            {userRole === 'member' ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn-yellow"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="btn-yellow"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="btn-yellow"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;