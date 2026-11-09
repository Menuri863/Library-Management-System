import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Auth.css';

export default function Register() {


const [showPassword,setShowPassword] = useState(false);
const [showConfirmPassword,setShowConfirmPassword] = useState(false);



const [formData,setFormData] = useState({

name:'',
email:'',
username:'',
phone_number:'',
gender:'',
password:'',
confirmPassword:'',
role:'member',
admin_code:''

});



const handleChange=(e)=>{

setFormData({

...formData,
[e.target.name]:e.target.value

});

};




const handleRegister=async(e)=>{

e.preventDefault();



if(formData.password !== formData.confirmPassword){

alert("Passwords do not match!");
return;

}



try{


await axios.post(
"http://localhost:8000/api/register",
formData
);



alert("Registration Successful!");

window.location.href="/login";



}catch(error){


console.log(error);

alert(
error.response?.data?.message ||
"Registration Failed"
);


}


};





return(

<div className="auth-wrapper">

<div className="auth-card">


<div className="logo-section">

<h1>LIBRARY</h1>
<p>MANAGEMENT SYSTEM</p>

</div>



<h2>Create Account</h2>


<p style={{textAlign:'center',marginBottom:'20px'}}>
Fill in the details to get started
</p>





<form onSubmit={handleRegister}>


<input
name="name"
type="text"
placeholder="Full Name"
className="input-field"
value={formData.name}
onChange={handleChange}
required
/>




<input
name="email"
type="email"
placeholder="Email Address"
className="input-field"
value={formData.email}
onChange={handleChange}
required
/>




<input
name="username"
type="text"
placeholder="Username"
className="input-field"
value={formData.username}
onChange={handleChange}
required
/>




<input
name="phone_number"
type="text"
placeholder="Phone Number"
className="input-field"
value={formData.phone_number}
onChange={handleChange}
required
/>





<select
name="gender"
className="input-field"
value={formData.gender}
onChange={handleChange}
required
>

<option value="">
Select Gender
</option>

<option value="Male">
Male
</option>

<option value="Female">
Female
</option>

</select>





<select
name="role"
className="input-field"
value={formData.role}
onChange={handleChange}
>


<option value="member">
Member
</option>


<option value="staff">
Staff
</option>


<option value="admin">
Admin
</option>


</select>





{

(formData.role==="admin" ||
formData.role==="staff") &&


<input
name="admin_code"
type="password"
placeholder="Enter Admin Code"
className="input-field"
value={formData.admin_code}
onChange={handleChange}
required
/>

}






<div className="password-box">

<input
name="password"
type={showPassword ? "text":"password"}
placeholder="Password"
className="input-field"
value={formData.password}
onChange={handleChange}
required
/>


<span onClick={()=>setShowPassword(!showPassword)}>

{

showPassword ? 
<FaEyeSlash/> :
<FaEye/>

}

</span>


</div>







<div className="password-box">


<input
name="confirmPassword"
type={showConfirmPassword ? "text":"password"}
placeholder="Confirm Password"
className="input-field"
value={formData.confirmPassword}
onChange={handleChange}
required
/>


<span onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>

{

showConfirmPassword ?
<FaEyeSlash/> :
<FaEye/>

}

</span>


</div>






<div className="options">

<label>

<input 
type="checkbox"
required
/>

I agree to 

<Link 
to="/terms"
style={{
color:"#3498db",
marginLeft:"5px"
}}
>
Terms & Conditions
</Link>


</label>


</div>






<button
type="submit"
className="submit-btn"
>
REGISTER
</button>





</form>





<p className="footer-text">

Already have an account?

<Link to="/login">
 Login now
</Link>


</p>



</div>


</div>


);


}