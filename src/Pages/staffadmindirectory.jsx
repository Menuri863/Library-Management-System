import React, { useEffect, useState } from "react";
import axios from "axios";
import "./staffadmindirectory.css";

const StaffAdminDirectory = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("all");

    const [viewUser, setViewUser] = useState(null);
    const [editUser, setEditUser] = useState(null);


    useEffect(() => {
        fetchUsers();
    }, [filter]);



    const fetchUsers = () => {

        let url = "http://127.0.0.1:8000/api/users";

        if(filter !== "all"){
            url += `?role=${filter}`;
        }


        axios.get(url)
        .then(res => {

            setUsers(res.data);

        })
        .catch(err => {

            console.log(err);

        });

    };



    // View
    const handleView = (user) => {

        setViewUser(user);

    };



    // Edit
    const handleEdit = (user) => {

        setEditUser(user);

    };



    // Update
    const handleUpdate = () => {


        axios.put(
            `http://127.0.0.1:8000/api/users/${editUser.id}`,
            editUser
        )
        .then(() => {

            alert("User updated successfully");

            setEditUser(null);

            fetchUsers();

        })
        .catch(err => {

            console.log(err);

            alert("Update failed");

        });

    };



    // Delete
    const handleDelete = (id) => {


        if(window.confirm("Are you sure you want to delete this user?")){


            axios.delete(
                `http://127.0.0.1:8000/api/users/${id}`
            )
            .then(()=>{

                alert("User deleted");

                fetchUsers();

            })
            .catch(err=>console.log(err));


        }

    };




    const totalStaff = users.filter(
        user => user.role === "staff"
    ).length;


    const totalAdmin = users.filter(
        user => user.role === "admin"
    ).length;



    return (

        <div className="directory-wrapper">


            <h1>
                Staff & Admin Directory
            </h1>


            <p style={{color:'#666',marginBottom:'20px'}}>
                Manage and view staff and admin records in one place.
            </p>




            <div className="directory-header">


                <select
                    className="filter-box"
                    value={filter}
                    onChange={(e)=>setFilter(e.target.value)}
                >

                    <option value="all">
                        All
                    </option>

                    <option value="staff">
                        Staff
                    </option>

                    <option value="admin">
                        Admin
                    </option>


                </select>


            </div>





            <div className="stats-container">


                <div className="stat-card">

                    Total Staff

                    <p>
                        {totalStaff}
                    </p>

                </div>



                <div className="stat-card">

                    Total Admin

                    <p>
                        {totalAdmin}
                    </p>

                </div>


            </div>





            <table className="member-table">


                <thead>

                    <tr>

                        <th>NAME</th>

                        <th>USERNAME</th>

                        <th>EMAIL</th>

                        <th>PHONE NUMBER</th>

                        <th>ROLE</th>

                        <th>ACTIONS</th>

                    </tr>


                </thead>




                <tbody>


                {
                    users.map(user => (

                        <tr key={user.id}>


                            <td>
                                {user.name}
                            </td>


                            <td>
                                {user.username}
                            </td>


                            <td>
                                {user.email}
                            </td>


                            <td>
                                {user.phone_number || "N/A"}
                            </td>



                            <td>

                                <span className="gender-badge">
                                    {user.role}
                                </span>

                            </td>



                            <td>


                                <button
                                className="action-btn"
                                onClick={()=>handleView(user)}
                                >
                                    👁️
                                </button>



                                <button
                                className="action-btn"
                                onClick={()=>handleEdit(user)}
                                >
                                    ✏️
                                </button>



                                <button
                                className="action-btn"
                                onClick={()=>handleDelete(user.id)}
                                >
                                    🗑️
                                </button>


                            </td>


                        </tr>

                    ))
                }


                </tbody>


            </table>






            {/* VIEW POPUP */}

            {
            viewUser &&

            <div className="modal">

                <div className="modal-content">

                    <h2>User Details</h2>

                    <p><b>Name:</b> {viewUser.name}</p>

                    <p><b>Username:</b> {viewUser.username}</p>

                    <p><b>Email:</b> {viewUser.email}</p>

                    <p><b>Phone Number:</b> {viewUser.phone_number}</p>

                    <p><b>Role:</b> {viewUser.role}</p>


                    <button onClick={()=>setViewUser(null)}>
                        Close
                    </button>


                </div>

            </div>

            }





            {/* EDIT POPUP */}

            {
            editUser &&

            <div className="modal">

                <div className="modal-content">


                    <h2>Edit User</h2>


                    <input
                    value={editUser.name}
                    onChange={(e)=>setEditUser({
                        ...editUser,
                        name:e.target.value
                    })}
                    />



                    <input
                    value={editUser.phone_number || ""}
                    onChange={(e)=>setEditUser({
                        ...editUser,
                        phonenumber:e.target.value
                    })}
                    />



                    <input
                    value={editUser.email}
                    onChange={(e)=>setEditUser({
                        ...editUser,
                        email:e.target.value
                    })}
                    />



                    <button onClick={handleUpdate}>
                        Update
                    </button>



                    <button onClick={()=>setEditUser(null)}>
                        Cancel
                    </button>


                </div>

            </div>

            }



        </div>

    );

};


export default StaffAdminDirectory;