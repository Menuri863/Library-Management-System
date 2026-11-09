import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./explore.css";

const Explore = () => {

  const [books, setBooks] = useState([]);
  const [typedQuery, setTypedQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleReserve = async (book) => {

    const user = localStorage.getItem("user");


    if (!user || user === "undefined") {

      setMessage("⚠️ Please login to reserve this book");


      setTimeout(() => {

        navigate("/login");

      }, 2000);


      return;

    }


    const member = JSON.parse(user);


    try {


      await axios.post(

        "http://127.0.0.1:8000/api/reservations",

        {

          reservation_id: "R001",

          member_id: member.member_id,

          book_id: book.book_id,

          book_title: book.book_title,

          author: book.author,

          status: "Pending"

        }

      );


      setMessage("✅ Reservation request sent successfully");


    } catch(error) {

    if(error.response?.data?.message){

        alert(error.response.data.message);

    } else {

        alert("Reservation failed");

    }

}


  };




  useEffect(() => {

    fetchBooks();

  }, []);




  const fetchBooks = async () => {

    try {


      const response = await axios.get(

        "http://127.0.0.1:8000/api/books"

      );


      setBooks(response.data);


    } catch(error) {


      console.error("Error fetching books:", error);


    }

  };




  const handleSearch = (e) => {

    e.preventDefault();

    setSearchQuery(typedQuery);

    setMessage("");

  };




  const filteredBooks = books.filter((book) => {


    const searchText = searchQuery.toLowerCase();


    return (

      searchQuery !== "" &&

      (

        book.book_title?.toLowerCase().includes(searchText) ||

        book.author?.toLowerCase().includes(searchText) ||

        book.category?.toLowerCase().includes(searchText)

      )

    );


  });




  return (


    <div className="explore-page">


      <form 
        className="search-form"
        onSubmit={handleSearch}
      >


        <div className="search-input-container">


          <FaSearch className="search-icon"/>



          <input

            type="text"

            className="explore-search-input"

            placeholder="Search books by title..."

            value={typedQuery}

            onChange={(e)=>
              setTypedQuery(e.target.value)
            }

          />


        </div>



        <button
          type="submit"
          className="search-btn"
        >

          Search

        </button>


      </form>



      {message && (

        <div className="reserve-message">

          {message}

        </div>

      )}






      <div className="book-grid">


      {

        filteredBooks.length > 0 ?


        filteredBooks.map((book)=>(



          <div

            className={`book-card ${
              book.category?.toLowerCase() === "child"
              ? "child-book"
              : "adult-book"
            }`}

            key={book.book_id}

          >



            <div className="book-cover-placeholder">

              📖

            </div>




            <div 
              className={`book-type ${
                book.category?.toLowerCase()
              }`}
            >

              {
                book.category?.toLowerCase() === "child"
                ? "🧒 Child Book"
                : "👤 Adult Book"
              }

            </div>




            <h3>

              {book.book_title}

            </h3>



            <p>

              <b>Author :</b> {book.author}

            </p>



            <p>

              <b>Publisher :</b> {book.publisher}

            </p>



            <p>

              <b>Publisher Year :</b> {book.publish_year}

            </p>



            <p>

              <b>ISBN :</b> {book.isbn}

            </p>



            <p>

              <b>Quantity :</b> {book.quantity}

            </p>



            <p>

              <b>Category :</b> {book.category}

            </p>





            <button

              className="reserve-btn"

              onClick={() => handleReserve(book)}

            >

              Apply to Reserve

            </button>



          </div>


        ))


        :


        searchQuery !== "" &&

        (

          <p className="no-result">

            No books found

          </p>

        )


      }


      </div>


    </div>


  );

};


export default Explore;