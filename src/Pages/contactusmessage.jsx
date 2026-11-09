import React, { useEffect, useState } from "react";
import axios from "axios";
import './admindashboard.css';

const ContactUsMessage = () => {

    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");

    useEffect(() => {
        getMessages();
    }, []);


    const getMessages = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/contactus"
            );

            setMessages(res.data);

        } catch (error) {
            console.log(error);
        }
    };


    const sendReply = async (id) => {

        try {
            await axios.put(
                `http://localhost:8000/api/contactus/${id}/reply`,
                {
                    reply: reply
                }
            );

            alert("Reply sent");

            setReply("");
            getMessages();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="contact-message-container">

            <h2>Contact Us Messages</h2>

            {messages.map((msg) => (

                <div className="message-card" key={msg.id}>

                    <h4>{msg.name}</h4>

                    <p>Email: {msg.email}</p>

                    <p>{msg.message}</p>


                    <textarea
                        className="reply-box"
                        placeholder="Write reply"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />


                    <button
                        className="reply-btn"
                        onClick={() => sendReply(msg.id)}
                    >
                        Reply
                    </button>

                </div>

            ))}

        </div>
    );
};


export default ContactUsMessage;