import React, { useEffect, useState } from "react";
import axios from "axios";
import "./issuebook.css";


const IssueBook = () => {

  const [reservations, setReservations] = useState([]);
  const [issueDate, setIssueDate] = useState("");


  useEffect(() => {
    getApprovedReservations();
  }, []);


  const getApprovedReservations = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/reservations"
      );


      const approved = res.data.filter(
        item => item.status === "Approved"
      );


      setReservations(approved);


    } catch(error) {

      console.log(error);

    }

  };



  const issueBook = async (reservationId) => {

    try {

      await axios.put(

        `http://127.0.0.1:8000/api/reservations/issue/${reservationId}`,

        {
          issue_date: issueDate
        }

      );


      alert("Book Issued Successfully!");

      getApprovedReservations();


    } catch(error) {

      alert(
        error.response?.data?.message ||
        "Issue failed"
      );

    }

  };



  return (

    <div className="issue-container">

      <h2>📘 Issue Book</h2>


      <input
        type="date"
        value={issueDate}
        onChange={(e)=>setIssueDate(e.target.value)}
      />


      <table>

        <thead>

          <tr>

            <th>Reservation ID</th>
            <th>Member ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>


        <tbody>

        {
          reservations.map((item)=>(

            <tr key={item.reservation_id}>

              <td>{item.reservation_id}</td>

              <td>{item.member_id}</td>

              <td>{item.book_title}</td>

              <td>{item.author}</td>

              <td>{item.status}</td>


              <td>

                <button
                onClick={()=>issueBook(item.reservation_id)}
                >
                  Issue Book
                </button>

              </td>


            </tr>

          ))
        }

        </tbody>

      </table>


    </div>

  );

};


export default IssueBook;