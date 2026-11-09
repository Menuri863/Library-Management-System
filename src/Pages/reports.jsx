import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reports.css";

function Reports() {

    const [reports, setReports] = useState([]);

    const [reportType, setReportType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [quickRange, setQuickRange] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReport, setEditingReport] = useState(null);


    const navigate = useNavigate();



    useEffect(() => {

        getReports();

    }, []);



    // Get all reports

    const getReports = () => {

        axios.get("http://127.0.0.1:8000/api/reports")

        .then((response)=>{

            setReports(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });

    };




    // Search reports

    const searchReports = () => {


        axios.get("http://127.0.0.1:8000/api/reports",{

            params:{

                report_type:reportType,
                from_date:fromDate,
                to_date:toDate,
                quick_range:quickRange

            }

        })

        .then((response)=>{

            setReports(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });


    };




    // Clear filter

    const clearFilters =()=>{


        setReportType("");
        setFromDate("");
        setToDate("");
        setQuickRange("");

        getReports();

    };





    // Delete

    const deleteReport=(id)=>{


        if(window.confirm("Do you want to delete this report?")){


            axios.delete(
                `http://127.0.0.1:8000/api/reports/${id}`
            )

            .then(()=>{


                setReports(
                    reports.filter(
                        report=>report.report_id !== id
                    )
                );


                alert("Report deleted successfully");


            })

            .catch((error)=>{

                console.log(error);

            });


        }


    };





    // Update

    const handleUpdate=()=>{


        axios.put(

            `http://127.0.0.1:8000/api/reports/${editingReport.report_id}`,

            editingReport

        )

        .then(()=>{


            alert("Report updated successfully");

            setIsModalOpen(false);

            getReports();


        })

        .catch(error=>{

            console.log(error);

        });


    };





    // Download PDF

    const downloadReport=(id)=>{


        window.open(

            `http://127.0.0.1:8000/api/reports/download/${id}`,

            "_blank"

        );


    };





return (

<div className="reports-container">



{/* Header */}

<div className="reports-header">


<img src="/Library-Logo.png"className="library-logo"alt="Library Logo"/>


<h1>
VEYANGODA PUBLIC LIBRARY REPORTS
</h1>


<p>
View and manage library generated reports
</p>


</div>





{/* Filters */}


<div className="filter-card">


<h2>Report Filters</h2>


<div className="filters">



<div className="filter-group">

<label>Report Type</label>

<select
value={reportType}
onChange={(e)=>setReportType(e.target.value)}
>


<option value="">
Select Report Type
</option>

<option value="Book Report">
Book Report
</option>


<option value="Member Report">
Member Report
</option>


<option value="Fine Report">
Fine Report
</option>


<option value="Reservation Report">
Reservation Report
</option>


</select>


</div>





<div className="filter-group">

<label>From Date</label>


<input

type="date"

value={fromDate}

onChange={(e)=>setFromDate(e.target.value)}

/>


</div>





<div className="filter-group">

<label>To Date</label>


<input

type="date"

value={toDate}

onChange={(e)=>setToDate(e.target.value)}

/>


</div>





<div className="filter-group">


<label>Quick Range</label>


<select

value={quickRange}

onChange={(e)=>setQuickRange(e.target.value)}

>


<option value="">
Select Range
</option>


<option value="this_month">
This Month
</option>


<option value="last_month">
Last Month
</option>


<option value="this_year">
This Year
</option>


</select>


</div>



<div className="search-area">


<button
className="search-btn"
onClick={searchReports}
>
🔍 Search
</button>



<button

className="clear-btn"

onClick={clearFilters}

>
❌ Clear
</button>


</div>


</div>


</div>








{/* Table */}


<div className="table-card">


<h2>Generated Reports</h2>



<table>


<thead>

<tr>

<th>Report ID</th>
<th>Report Name</th>
<th>Type</th>
<th>Date Range</th>
<th>Generated Date</th>
<th>Status</th>
<th>Action</th>


</tr>

</thead>



<tbody>


{

reports.length > 0 ?

reports.map((report)=>(


<tr key={report.report_id}>


<td>{report.report_id}</td>


<td>{report.report_name}</td>


<td>{report.report_type}</td>


<td>

{report.from_date} - {report.to_date}

</td>


<td>

{report.created_at?.split("T")[0]}

</td>



<td>


<span

className={
report.status==="Pending"
?
"processing"
:
"completed"
}

>

{report.status}

</span>


</td>




<td>


<button
onClick={()=>{
    navigate("/admin/dashboard",{
        state:{
            openTab:"report-details",
            reportId: report.report_id
        }
    });
}}
>
👁️
</button>

<button

onClick={()=>downloadReport(report.report_id)}

>
⬇️
</button>




<button

onClick={()=>deleteReport(report.report_id)}

>
🗑️
</button>




<button

onClick={()=>{

setEditingReport(report);

setIsModalOpen(true);

}}

>
✏️
</button>



</td>


</tr>



))


:


<tr>

<td colSpan="7">

No Reports Found

</td>

</tr>


}



</tbody>


</table>


</div>









{/* Edit Modal */}



{

isModalOpen && editingReport &&

<div className="report-modal">


<div className="modal-box">


<h2>Edit Report</h2>



<label>
Report Name
</label>


<input

className="modal-input"

value={editingReport.report_name}

onChange={(e)=>

setEditingReport({

...editingReport,

report_name:e.target.value

})

}

/>





<label>
Report Type
</label>


<select

className="modal-select"

value={editingReport.report_type}

onChange={(e)=>

setEditingReport({

...editingReport,

report_type:e.target.value

})

}

>


<option>
Book Report
</option>

<option>
Member Report
</option>

<option>
Fine Report
</option>

<option>
Reservation Report
</option>


</select>





<label>
Status
</label>


<select

className="modal-select"

value={editingReport.status}

onChange={(e)=>

setEditingReport({

...editingReport,

status:e.target.value

})

}

>


<option>
Pending
</option>


<option>
Completed
</option>


</select>





<button

className="search-btn"

onClick={handleUpdate}

>

Save Changes

</button>



<button

className="close-btn"

onClick={()=>setIsModalOpen(false)}

>

Cancel

</button>



</div>


</div>


}

<button
    className="generate-btn"
    onClick={() =>
        navigate("/admin/dashboard", {
            state: {
                openTab: "generate-report"
            }
        })
    }
>
    📄 Generate Report
</button>



</div>


);


}


export default Reports;