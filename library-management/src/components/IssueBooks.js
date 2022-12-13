import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
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
const IssueBooks = () => {

    const [userBooks, setUserBooks] = useState([])

    useEffect(() => {
         axios.get(env.BACKEND_URL+'/getUserRequestedBooks.php')
            .then(response => {
                console.log(response.data);
                setUserBooks(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const issueBook = (ubid) => {
        axios.post(env.BACKEND_URL+'/issueBook.php', { ubid: ubid })
            .then(response => {
                alert("Book Issued Successfully!")
                setUserBooks(userBooks.filter(i => i.ubid !== ubid))
                //console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                alert("Error Occured! Please try again later.")
            })
    }

  return (
    <>
    <h3>Remove Books</h3>
    <div className="table-div">
        <table className="styled-table" id="garden-table">
          <thead>
            <tr>
              <td>UserId</td>
              <td>BookId</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {userBooks.length > 0 ? userBooks.map(i =>
              <tr key={i.ubid}>
                <td>{i.username}</td>
                <td>{i.bookname}</td>
                <td>
                    <button style={BtnStyle}  onClick={() => issueBook(i.ubid)}>Issue</button>
                </td>
              </tr>
            ) : <tr><td colSpan={5}>Sorry! There are no requests. Please create new to view them here.</td></tr>}
          </tbody>
        </table>
      </div>
      </>
  )
}

export default IssueBooks;