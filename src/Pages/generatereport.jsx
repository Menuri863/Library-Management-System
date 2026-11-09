import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./generateReport.css";

function GenerateReport(){
const navigate = useNavigate();
const [report,setReport]=useState({
    report_name:"",
    report_type:"",
    from_date:"",
    to_date:""
});


const saveReport = () => {

    if(!report.report_name || !report.report_type){
        alert("Please fill required fields!");
        return;
    }


    axios.post(
        "http://127.0.0.1:8000/api/reports",
        report
    )
    .then((response)=>{

        alert("Report generated successfully!");

        setReport({
            report_name:"",
            report_type:"",
            from_date:"",
            to_date:""
        });

    })
    .catch(error=>{

        console.log(error);

        alert("Failed to generate report!");

    });

};



return(

<div className="generate-container">

<div className="generate-card">

<h1>Generate New Report</h1>


<label>Report Name</label>

<input
type="text"
value={report.report_name}
onChange={(e)=>setReport({
    ...report,
    report_name:e.target.value
})}
/>


<label>Report Type</label>

<select
value={report.report_type}
onChange={(e)=>setReport({
    ...report,
    report_type:e.target.value
})}
>

<option value="">Select Type</option>
<option value="Book Report">Book Report</option>
<option value="Member Report">Member Report</option>
<option value="Reservation Report">Reservation Report</option>
<option value="Fine Report">Fine Report</option>

</select>



<label>From Date</label>

<input
type="date"
value={report.from_date}
onChange={(e)=>setReport({
    ...report,
    from_date:e.target.value
})}
/>



<label>To Date</label>

<input
type="date"
value={report.to_date}
onChange={(e)=>setReport({
    ...report,
    to_date:e.target.value
})}
/>



<button onClick={saveReport}>
    Generate Report
</button>

<button
    onClick={() =>
        navigate("/admin/dashboard", {
            state:{
                openTab:"reports"
            }
        })
    }
>
    Back
</button>


</div>

</div>

);

}

export default GenerateReport;