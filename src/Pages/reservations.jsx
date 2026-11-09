import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reservations.css";


const Reservations = () => {

    const [reservations, setReservations] = useState([]);



    useEffect(() => {

        fetchReservations();

    }, []);



    const fetchReservations = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/reservations"
            );

            setReservations(response.data);


        } catch(error) {

            console.log(error);

        }

    };



    
    const updateStatus = async (id, status) => {


    const confirmAction = window.confirm(
        `Are you sure you want to ${status.toLowerCase()} this reservation?`
    );


    if (!confirmAction) {
        return;
    }


    try {


        await axios.put(

            `http://127.0.0.1:8000/api/reservations/status/${id}`,

            {
                status: status
            }

        );


        alert(
            `Reservation ${status} successfully`
        );


        fetchReservations();



    } catch(error) {


        console.log(error.response?.data || error);

        alert("Status update failed");


    }

};




    return (

        <div className="reservation-container">


            <h2>
                Reservation Requests
            </h2>



            <table>


                <thead>

                    <tr>

                        <th>
                            Reservation ID
                        </th>

                        <th>
                            Member ID
                        </th>

                        <th>
                            Book Title
                        </th>

                        <th>
                            Author
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>


                    </tr>

                </thead>



                <tbody>


                {
                    reservations.length > 0 ?


                    reservations.map((reservation)=>(


                        <tr key={reservation.reservation_id}>


                            <td>
                                {reservation.reservation_id}
                            </td>


                            <td>
                                {reservation.member_id}
                            </td>


                            <td>
                                {reservation.book_title}
                            </td>


                            <td>
                                {reservation.author}
                            </td>


                            <td>
                                {reservation.status}
                            </td>


                            <td>

<button
className="approve-btn"
onClick={() =>
  updateStatus(
    reservation.reservation_id,
    "Approved"
  )
}
>
Approve
</button>


<button
className="reject-btn"
onClick={() =>
  updateStatus(
    reservation.reservation_id,
    "Rejected"
  )
}
>
Reject
</button>

</td>


                        </tr>


                    ))


                    :


                    <tr>

                        <td colSpan="6">

                            No reservation requests found

                        </td>

                    </tr>


                }



                </tbody>


            </table>


        </div>


    );

};


export default Reservations;