import React, { useState } from "react";
import axios from "axios";
import "./fines.css";

const Fines = () => {

  const [memberId, setMemberId] = useState("");

  const [member, setMember] = useState({
    name: "",
    contact: ""
  });

  const [fines, setFines] = useState([]);

  const [total, setTotal] = useState(0);

  const [receipt, setReceipt] = useState(null);


  // Search Member and Get Fines
  const fetchMemberData = async () => {

    if (!memberId) {
      alert("Please enter Member ID");
      return;
    }

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/fines/${memberId}`
      );


      setMember({
        name: response.data.member.name,
        contact: response.data.member.contact
      });


      setFines(response.data.fines);

      setTotal(response.data.total);


    } catch (error) {

      alert("Member not found or error occurred");

      setFines([]);
      setTotal(0);

    }

  };


const hasPaidFine = fines.some(
  (fine)=> fine.status === "Paid"
);

const generateBill = () => {

    window.open(
        `http://127.0.0.1:8000/api/fines/bill/${memberId}`,
        "_blank"
    );

};

  // Pay All Fines and Generate Receipt
  const handleGenerateReceipt = async () => {


    if (!memberId) {

      alert("Please enter Member ID");

      return;

    }



    try {


      const response = await axios.post(

        "http://127.0.0.1:8000/api/fines/pay",

        {
          member_id: memberId
        }

      );



      setReceipt({

        no: response.data.receipt_no || "REC001",

        date: new Date().toLocaleDateString()

      });



      alert(response.data.message);



      //Refresh fines after payment
      await fetchMemberData();


    } catch(error) {


      alert("Payment failed");


    }


  };




  return (

    <div className="fine-container">


      <div className="top-header">

        <h1>
          LIBRARY MANAGEMENT SYSTEM - Integrated Fine Payment
        </h1>

      </div>





      <div className="content-area">





        {/* Transaction List */}

        <div className="transaction-card">


          <h2>
            Transaction List
          </h2>



          <table className="fine-table">


            <thead>

              <tr>

                <th></th>

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


              {

                fines.length > 0 ?


                fines.map((fine)=>(


                  <tr key={fine.id}>


                    <td>

                      <input 
                        type="checkbox"
                        defaultChecked
                      />

                    </td>


                    <td>
                      {fine.book_id}
                    </td>


                    <td>
                      {fine.book_title}
                    </td>


                    <td>
                      {fine.return_due_date}
                    </td>


                    <td>
                      {fine.late_days}
                    </td>


                    <td>
                      {fine.daily_fine_rate}
                    </td>


                    <td>
                      ${fine.current_fine}
                    </td>


                    <td>
                      ${fine.fine_amount}
                    </td>

                    <td>
                      {fine.status}
                    </td>


                    


                  </tr>


                ))


                :


                <tr>

                  <td colSpan="9">
                    No Fine Records Found
                  </td>

                </tr>


              }


            </tbody>



          </table>



        </div>






        {/* Payment Section */}


        <div className="payment-card">


          <h2>
            Payment Processing
          </h2>




          <div className="member-box" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Input සහ Search Button එක */}
            <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
              <input
                type="text"
                placeholder="Enter Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
              <button onClick={fetchMemberData}>➜</button>
            </div>

            {/* Name සහ Contact එක පේළියට */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <span>Name</span>
                <h4>{member.name || "-"}</h4>
              </div>
              <div>
                <span>Phone Number</span>
                <h4>{member.contact || "-"}</h4>
              </div>
            </div>

          </div>






          <div className="balance-section">


            <h3>
              Overall Pending Balance (Total)
            </h3>



            <h1>
              ${Number(total).toFixed(2)}
            </h1>




{
  hasPaidFine && (
            <button

              className="receipt-btn"

              onClick={generateBill}

            >

              GENERATE CONSOLIDATED RECEIPT


            </button>
  )
}



          </div>







          {

            receipt &&


            <div className="receipt-box">


              <h2>
                Consolidated Receipt
              </h2>



              <p>
                Library Name
              </p>



              <p>
                Receipt No : {receipt.no}
              </p>



              <p>
                Date : {receipt.date}
              </p>



              <hr />



              <p>
                Name : {member.name}
              </p>



              <p>
                Contact : {member.contact}
              </p>



              <hr />



              <p>
                Total Paid : ${Number(total).toFixed(2)}
              </p>




            </div>


          }





        </div>





      </div>




    </div>


  );

};


export default Fines;