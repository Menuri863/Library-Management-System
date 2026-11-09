import React, { useEffect, useState } from "react";
import axios from "axios";
import "./returnbook.css";


const ReturnBook = () => {

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [returnDate, setReturnDate] = useState("");


  useEffect(() => {
    getIssuedBooks();
  }, []);



  const getIssuedBooks = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/reservations"
      );


      const issued = res.data.filter(
        item => item.status === "Issued"
      );


      setIssuedBooks(issued);


    } catch(error) {

      console.log(error);

    }

  };




  const returnBook = async (reservationId) => {

    try {

      await axios.put(

        `http://127.0.0.1:8000/api/reservations/return/${reservationId}`,

        {
          return_date: returnDate
        }

      );


      alert("Book Returned Successfully!");

      getIssuedBooks();


    } catch(error){

      alert(
        error.response?.data?.message ||
        "Return failed"
      );

    }

  };




return (

<div className="return-container">


<h2>📗 Return Book</h2>


<input
type="date"
value={returnDate}
onChange={(e)=>setReturnDate(e.target.value)}
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
issuedBooks.map((item)=>(


<tr key={item.reservation_id}>


<td>{item.reservation_id}</td>


<td>{item.member_id}</td>


<td>{item.book_title}</td>


<td>{item.author}</td>


<td>{item.status}</td>



<td>

<button
onClick={()=>returnBook(item.reservation_id)}
>

Return Book

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


export default ReturnBook;