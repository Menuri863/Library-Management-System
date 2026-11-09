import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Auth.css';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:8000/api/login", {

        method: "POST",

        headers: { 
          "Content-Type": "application/json" 
        },

        body: JSON.stringify({ 
          login: username, 
          password: password
        }),

      });


      const data = await res.json();


      if (!res.ok) {

        alert(data.message);
        return;

      }


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      localStorage.setItem(
        "role",
        data.role
      );


      navigate(data.redirect);



    } catch (error) {

      alert("Server error!");

    }

  };



  return (

    <div className="auth-wrapper">


      <form 
        className="auth-card" 
        onSubmit={handleLogin}
      >


        <div className="logo-section">

          <h1>LIBRARY</h1>

          <p>
            MANAGEMENT SYSTEM
          </p>

        </div>



        <h2>
          Welcome Back!
        </h2>



        <input 

          type="text"

          placeholder="Email/Username"

          className="input-field"

          value={username}

          onChange={(e)=>setUsername(e.target.value)}

          required

        />




        <div className="password-box">


          <input 

            type={showPassword ? "text" : "password"}

            placeholder="Password"

            className="input-field"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />



          <span 
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >

            {
              showPassword 
              ? 
              <FaEyeSlash/>
              :
              <FaEye/>
            }


          </span>


        </div>






        <div className="options">


          <label 
            style={{ 
              display:'flex',
              alignItems:'center',
              gap:'8px'
            }}
          >

            <input type="checkbox" />

            Remember me

          </label>


        </div>






        <button 
          type="submit" 
          className="submit-btn"
        >

          LOGIN

        </button>






        <p className="footer-text">

          Don't have an account?

          <a href="/register">
            Register now
          </a>


        </p>



      </form>


    </div>

  );

}