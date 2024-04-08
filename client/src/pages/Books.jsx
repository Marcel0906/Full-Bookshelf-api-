import  { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/books`);
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/books/${id}`);
      const response = await axios.get(`http://localhost:5003/books`);
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <br></br>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",

          gap: "80px",
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              maxWidth: "200px",
              height: "550px",
            }}
          >
            <img
              style={{
                maxWidth: "200px",
                height: "300px",
                borderRadius: "5px",
              }}
              src={book.imageLink}
              alt={book.title}
            />
            <div
              style={{
                width: "100%",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "15px" }}>{book.title}</h2>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "10px",
                border: "1px solid #b5b5b5c6",
                borderRadius: "5px",
                margin: "10px",
                fontSize: "12px",
              }}
            >
              
              <p>Author: {book.author}</p>
              <p>Country: {book.country}</p>
              <p>Language: {book.language}</p>
              <p>Link: <a href={book.link}>{book.title}</a> </p>
              <p>Year: {book.year}</p>
              <p>Pages: {book.pages}</p>

              <button
                style={{
                  gap: "20px",
                  color: "#f8503dc6",
                  backgroundColor: "#c8c7c78b;",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  margin: "5px",
                }}
                onClick={() => handleDelete(book._id)}
              >
               delete
              </button>
              <button
                style={{
                  gap: "20px",
                  color: "#2860edd0",
                  backgroundColor: "#c8c7c78b;",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  margin: "5px",
                }}
              >
               update
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        style={{
          border: "none",
          textDecoration: "none",
          backgroundColor: "#caf5c0b9",
          color: "#000",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        <Link to="/add" style={{ textDecoration: "none", color: "#888" }}>
          Add new Book
        </Link>
      </button>
    </div>
  );
};

export default Books;