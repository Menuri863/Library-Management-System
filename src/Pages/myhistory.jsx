import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./myhistory.css";


const MyHistory = () => {


    const [historyData, setHistoryData] = useState([]);



    useEffect(() => {

        fetchHistory();

    }, []);



    const fetchHistory = async () => {

        try {


            const user = JSON.parse(
                localStorage.getItem("user")
            );


            if(!user){
                return;
            }



            const response = await axios.get(

                `http://127.0.0.1:8000/api/reservations/member/${user.member_id}`

            );


            setHistoryData(response.data);



        } catch(error) {


            console.log(error);


        }

    };



const onCancel = async (id) => {

    try {

        await axios.put(
            `http://127.0.0.1:8000/api/reservations/cancel/${id}`
        );

        alert("Reservation cancelled successfully");

        fetchHistory();

    } catch(error) {

        console.log(error.response?.data || error);

        alert("Cancel failed");

    }

};




    return (
        <div className="history-container">

            <table>

                <thead>

                    <tr>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Book Status</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                    {historyData && historyData.length > 0 ? (

                        historyData.map((book) => (

                            <tr key={book.reservation_id}>


                                <td>
                                    {book.book_title}
                                </td>


                                <td>
                                    {book.author}
                                </td>


                                <td>
                                    {book.status}
                                </td>


                                <td>


                                   {book.status?.toLowerCase() === 'pending' && (

    <button 
        className="cancel-btn"

        onClick={() => 
            onCancel(book.reservation_id)
        }

    >

        CANCEL 

    </button>

)}


                                    {book.status?.toLowerCase() === 'approved' && (

                                        <span 
                                            style={{ 
                                                color: '#2ecc71', 
                                                fontWeight: 'bold' 
                                            }}
                                        >

                                            Approved - Ready to Collect

                                        </span>

                                    )}



                                    {book.status?.toLowerCase() === 'rejected' && (

                                        <span 
                                            style={{ 
                                                color: '#e74c3c' 
                                            }}
                                        >

                                            Request Rejected

                                        </span>

                                    )}



                                    {book.status?.toLowerCase() === 'cancelled' && (

                                        <span 
                                            style={{ 
                                                color: '#777' 
                                            }}
                                        >

                                            Cancelled

                                        </span>

                                    )}


                                </td>


                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td 
                                colSpan="4" 
                                style={{ textAlign: 'center' }}
                            >

                                No history records found.

                            </td>

                        </tr>

                    )}

                </tbody>


            </table>


        </div>
    );

};


export default MyHistory;