import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios';

import env from "react-dotenv";

const UserBooks = () => {
    let currentUser;
    if (window.sessionStorage.getItem("userDetails")) {
        currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
    }
    const [bookName, setBookName] = useState("");
    const [pages, setPages] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
      axios({
        method: 'post',
        url: env.BACKEND_URL+'/userbooks.php',
        data: { uid: currentUser.uid }
    }).then((response) => {
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            setBooks(response.data);
        }
        else {
            alert("Something went wrong. Please try again");
        }
    }).catch(error => {
        console.log(error);
        alert("Something went wrong. Please try again");
    });
    },[]);
  return (
  <>
    <h3>Your Books</h3>
      <div className="table-div">
        <table className="styled-table" id="garden-table">
          <thead>
            <tr>
            <td>Book Name</td>
              <td>No.of pages</td>
              <td>status</td>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? books.map(i =>
              <tr key={i.bid}>
                <td>{i.bname}</td>
                <td>{i.noofpages}</td>
                <td>{i.issued === "0" ? "Requested":"Issued"} </td>
              </tr>
            ) : <tr><td colSpan={5}>Sorry! There are no books available.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserBooks