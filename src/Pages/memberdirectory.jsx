import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './memberdirectory.css'; 

const MemberDirectory = () => {

    const [members, setMembers] = useState([]);
    const [newTodayCount, setNewTodayCount] = useState(0);

    const [viewMember, setViewMember] = useState(null);
    const [editMember, setEditMember] = useState(null);


    useEffect(() => {
        fetchMembers();
    }, []);


    const fetchMembers = () => {
        axios.get('http://127.0.0.1:8000/api/members')
        .then(res => {
            const allMembers = res.data;
            setMembers(allMembers);

            const today = new Date().toISOString().split('T')[0];
            const todayMembers = allMembers.filter(m =>
                m.created_at && m.created_at.startsWith(today)
            );
            setNewTodayCount(todayMembers.length);
        })
        .catch(err => console.log(err));
    };


    // View
    const handleView = (member) => {
        setViewMember(member);
    };


    // Edit
    const handleEdit = (member) => {
        setEditMember(member);
    };


    // Update (member_id වෙනුවට id භාවිත කර ඇත)
    const handleUpdate = () => {
        axios.put(
            `http://127.0.0.1:8000/api/members/${editMember.member_id}`,
            editMember
        )
        .then(res => {
            alert("Member updated successfully");
            setEditMember(null);
            fetchMembers();
        })
        .catch(err => {
            console.log(err);
            alert("Update failed");
        });
    };


    // Delete (member_id වෙනුවට id භාවිත කර ඇත)
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this member?")){
            axios.delete(
                `http://127.0.0.1:8000/api/members/${id}`
            )
            .then(() => {
                alert("Member deleted");
                fetchMembers();
            })
            .catch(err => console.log(err));
        }
    };


    return (
        <div className="directory-wrapper">

            <h1 style={{fontWeight:'bold'}}>
                Member Directory
            </h1>

            <p style={{color:'#666',marginBottom:'20px'}}>
                Manage and view all member records in one place.
            </p>

            <div className="stats-container">
                <div className="stat-card">
                    Total Registered
                    <p>{members.length}</p>
                </div>

                <div className="stat-card" style={{borderColor:'#f1c40f'}}>
                    Active Records
                    <p>{members.length}</p>
                </div>

                <div className="stat-card">
                    New Today
                    <p>{newTodayCount}</p>
                </div>
            </div>

            <table className="member-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MEMBER NAME</th>
                        <th>GENDER</th>
                        <th>Phone Number</th>
                        <th>EMAIL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                {
                    members.map((member, index) => (
                        <tr key={member.id || index}>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.gender || 'N/A'}</td>
                            <td>{member.phone_number || 'N/A'}</td>
                            <td>{member.email || 'N/A'}</td>
                            <td>
                                <button className="action-btn" onClick={()=>handleView(member)}>
                                    👁️
                                </button>
                                <button className="action-btn" onClick={()=>handleEdit(member)}>
                                    ✏️
                                </button>
                                <button className="action-btn" onClick={()=>handleDelete(member.member_id)}>
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
                viewMember &&
                <div className="modal">
                    <div className="modal-content">
                        <h2>Member Details</h2>
                        <p><b>ID:</b> {viewMember.id}</p>
                        <p><b>Name:</b> {viewMember.name}</p>
                        <p><b>Gender:</b> {viewMember.gender}</p>
                        <p><b>Phone Number:</b> {viewMember.phone_number}</p>
                        <p><b>Email:</b> {viewMember.email}</p>

                        <button onClick={()=>setViewMember(null)}>
                            Close
                        </button>
                    </div>
                </div>
            }


            {/* EDIT POPUP */}
            {
                editMember &&
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Member</h2>

                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editMember.name || ""}
                            onChange={(e)=>setEditMember({
                                ...editMember,
                                name: e.target.value
                            })}
                        />

                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={editMember.phone_number || ""}
                            onChange={(e)=>setEditMember({
                                ...editMember,
                                phone_number: e.target.value
                            })}
                        />

                        <label>Gender</label>
                        <input
                            type="text"
                            placeholder="Gender"
                            value={editMember.gender || ""}
                            onChange={(e)=>setEditMember({
                                ...editMember,
                                gender: e.target.value
                            })}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={editMember.email || ""}
                            onChange={(e)=>setEditMember({
                                ...editMember,
                                email: e.target.value
                            })}
                        />

                        <div style={{marginTop: '15px'}}>
                            <button onClick={handleUpdate}>
                                Update
                            </button>
                            <button onClick={()=>setEditMember(null)} style={{marginLeft: '10px'}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default MemberDirectory;