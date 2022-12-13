import React from 'react'
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import env from "react-dotenv";

const BtnStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "10px",
    marginLeft: "1rem",
    marginTop: "1rem"
}
const deleteBtnStyle = {
    backgroundColor: "#f44336",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "10px",
    marginLeft: "1rem",
    marginTop: "1rem"
}
const tablediv= {
    overFlowX: "auto",
  }

const AddRemoveBooks = () => {
    let currentUser;
    if (window.sessionStorage.getItem("userDetails")) {
        currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
    }
    const [bookName, setBookName] = useState("");
    const [pages, setPages] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // axios.get(env.BACKEND_URL+'/books.php')
        //     .then(response => {
        //         setBooks(response.data);
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
            axios({
                method: 'get',
                url: env.BACKEND_URL+'/books.php'
           }).then(response => {
                    setBooks(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
    },[]);

    const addBook = (e) => {
        e.preventDefault();
        const book = {
            bookName: bookName,
            pages: pages
        }
       axios({
            method: 'post',
            url: env.BACKEND_URL+'/addBooks.php',
            data: {bname:book.bookName,bpages:book.pages}
       }).then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                alert("Book added successfully");
                setBookName("");
                setPages("");
            }
            else {
                alert("Something went wrong. Please try again");
            }
       }) .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again");
        });
    }

    const deleteBook = (bid) => {
        axios({
            method: 'post',
            url: env.BACKEND_URL+'/deletebook.php',
            data: { bid: bid }
        }).then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                alert("Book deleted successfully");
                setBooks(books.filter(i => i.bid !== bid));
            }
            else {
                alert("Something went wrong. Please try again");
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again");
        });
    }
  return (
    <>
        <div>
            <h3>Add Books</h3>
            <form name='addBook' onSubmit={addBook}>
                <div style={{marginBottom:'1rem'}}>
                    <input type='text' name='bookName' placeholder='Name of the book' value={bookName} onChange={(e) => setBookName(e.target.value)} />
                </div>
                <div>
                    <input type='text' name='pages' value={pages} placeholder="No.of pages" onChange={(e) => setPages(e.target.value)} />
                </div>
                <button type='submit' style={BtnStyle}>Add Book</button>
            </form>

            <h3>Remove Books</h3>
            <div className="table-div">
                <table className="styled-table" id="garden-table">
                  <thead>
                    <tr>
                      <td>Book Name</td>
                      <td>No.of pages</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length > 0 ? books.map(i =>
                      <tr key={i.bid}>
                        <td>{i.bname}</td>
                        <td>{i.noofpages}</td>
                        <td>
                            <button style={deleteBtnStyle}  onClick={() => deleteBook(i.bid)}>Delete</button>
                        </td>
                      </tr>
                    ) : <tr><td colSpan={5}>Sorry! There are no books. Please create new to view them here.</td></tr>}
                  </tbody>
                </table>
              </div>
        </div>
    </>
  )
}

export default AddRemoveBooks