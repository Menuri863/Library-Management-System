import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reportdetail.css";




    function ReportDetails({ reportId }) {
    const navigate = useNavigate();

    const [report, setReport] = useState(null);


    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/api/reports/view/${reportId}`
        )

        .then((response)=>{

            console.log(response.data);

            setReport(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });


    },[reportId]);



    if(!report){

        return <h2>Loading...</h2>;

    }



    const reportType = report.report.report_type;



    return (

        <div className="report-details-container">


            <div className="report-details-card">


                <h1>
                    {report.report.report_name}
                </h1>



                <p>
                    <b>Report ID :</b> {report.report.report_id}
                </p>


                <p>
                    <b>Report Type :</b> {report.report.report_type}
                </p>


                <p>
                    <b>Date Range :</b>{" "}
                    {report.report.from_date} - {report.report.to_date}
                </p>


                <p>
                    <b>Generated Date :</b>{" "}
                    {report.report.created_at?.split("T")[0]}
                </p>


                <p>
                    <b>Status :</b> {report.report.status}
                </p>




<div className="table-wrapper">

<h3>Report Data</h3>


{/* Fine Report */}

{reportType === "Fine Report" && (

<table className="report-table">

<thead>
<tr>
<th>Fine ID</th>
<th>Member ID</th>
<th>Book ID</th>
<th>Book Title</th>
<th>Return Due Date</th>
<th>Late Days</th>
<th>Daily Fine Rate</th>
<th>Current Fine</th>
<th>Fine Amount</th>
<th>Status</th>
</tr>
</thead>


<tbody>

{report.data.map((item,index)=>(

<tr key={index}>

<td>{item.fine_id}</td>
<td>{item.member_id}</td>
<td>{item.book_id}</td>
<td>{item.book_title}</td>
<td>{item.return_due_date}</td>
<td>{item.late_days}</td>
<td>{item.daily_fine_rate}</td>
<td>{item.current_fine}</td>
<td>{item.fine_amount}</td>
<td>{item.status}</td>

</tr>

))}

</tbody>

</table>

)}





{/* Book Report */}

{reportType === "Book Report" && (

<table className="report-table">

<thead>
<tr>

<th>Book ID</th>
<th>Book Title</th>
<th>Author</th>
<th>Publisher</th>
<th>Publish Year</th>
<th>Category</th>

</tr>
</thead>


<tbody>

{report.data.map((item,index)=>(

<tr key={index}>

<td>{item.book_id}</td>
<td>{item.book_title}</td>
<td>{item.author}</td>
<td>{item.publisher}</td>
<td>{item.publish_year}</td>
<td>{item.categroy}</td>

</tr>

))}

</tbody>

</table>

)}






{/* Member Report */}

{reportType === "Member Report" && (

<table className="report-table">

<thead>
<tr>

<th>Member ID</th>
<th>Name</th>
<th>Phone Number</th>
<th>Email</th>
<th>Gender</th>

</tr>
</thead>


<tbody>

{report.data.map((item,index)=>(

<tr key={index}>

<td>{item.member_id}</td>
<td>{item.name}</td>
<td>{item.phone_number}</td>
<td>{item.email}</td>
<td>{item.gender}</td>

</tr>

))}

</tbody>

</table>

)}






{/* Reservation Report */}

{reportType === "Reservation Report" && (

<table className="report-table">

<thead>

<tr>

<th>Reservation ID</th>
<th>Member ID</th>
<th>Book ID</th>
<th>Book Title</th>
<th>Author</th>
<th>Status</th>
<th>Issue Date</th>
<th>Due Date</th>
<th>Return Date</th>

</tr>

</thead>



<tbody>


{report.data.map((item,index)=>(

<tr key={index}>

<td>{item.reservation_id}</td>
<td>{item.member_id}</td>
<td>{item.book_id}</td>
<td>{item.book_title}</td>
<td>{item.author}</td>
<td>{item.status}</td>
<td>{item.issue_date}</td>
<td>{item.due_date}</td>
<td>{item.return_date}</td>

</tr>

))}


</tbody>


</table>

)}




{
report.data.length === 0 &&

<table className="report-table">

<tbody>

<tr>

<td>
No data found in database
</td>

</tr>

</tbody>

</table>

}



</div>




<button

className="back-btn"

onClick={()=>
navigate("/admin/dashboard",{
    state:{
        openTab:"reports"
    }
})
}

>

⬅️ Back

</button>



</div>


</div>

    );

}


export default ReportDetails;