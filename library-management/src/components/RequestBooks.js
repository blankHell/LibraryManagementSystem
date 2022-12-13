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

const RequestBooks = () => {
    const [userBooks, setUserBooks] = useState([])
    const [books, setBooks] = useState([]);
    let currentUser;
  if (window.sessionStorage.getItem("userDetails")) {
    currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
  }

    useEffect(() => {
        axios.get(env.BACKEND_URL+'/getbooks.php')
            .then(response => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[]);
    const requestBook = (bid) => {
        axios.post(env.BACKEND_URL+'/requestBook.php', { bid: bid, uid: currentUser.uid })
            .then(response => {
              if(response.status === "success"){
                 alert("Book Issued Successfully!")
                setUserBooks(books.filter(i => i.bid !== bid))
              }
              else{
                alert("Something went wrong! Please try again later.")
              }
               
                //console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                alert("Error Occured! Please try again later.")
            })
    }

  return (
    <>
    <h3>Request Books</h3>
    <div className="table-div">
        <table className="styled-table" id="garden-table">
          <thead>
            <tr>
              <td>BookName</td>
              <td>Noofpages</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? books.map(i =>
              <tr key={i.bid}>
                <td>{i.bname}</td>
                <td>{i.noofpages}</td>
                <td>
                    <button style={BtnStyle}  onClick={() => requestBook(i.bid)}>Request</button>
                </td>
              </tr>
            ) : <tr><td colSpan={5}>Sorry! There are no requests.</td></tr>}
          </tbody>
        </table>
      </div>
      </>
  )
}

export default RequestBooks