import React from "react";
import Navbar from "./Navbar";
import '../css/admin.css';
import { Link } from "react-router-dom";
import AddRemoveBooks from "./AddRemoveBooks";
import IssueBooks from "./IssueBooks";
import { useState } from "react";

const AdminHome = () => {
  let currentUser;
  const [content, setContent] = useState("");

  if (window.sessionStorage.getItem("userDetails")) {
    currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
  }
  function showContent(contentName) {
    setContent(contentName);
  }
  return (
    currentUser.email === "admin@library.com" ?
      <>
        <Navbar />
        <div className="main-div">
          <div className="main-title">Hello {currentUser.firstName}!</div>
          <div className="admin-contents">
            <div className="admin-content-div">
              <div onClick={()=>showContent("AddRemoveBooks")}>
                <div className="admin-single-option">Manage Books</div>
              </div>
              <div onClick={()=>showContent("IssueBooks")}>
                <div className="admin-single-option">Issue Books</div>
              </div>
            </div>
          </div>
          {content === "AddRemoveBooks" ? <AddRemoveBooks /> : content === "IssueBooks" ? <IssueBooks /> : null}
        </div>
      </>
      :
      <>
        <div style={{ marginTop: "200px" }}>

          You are not authorized to access this page. Please
          <Link to="/login" style={{ color: "red" }}> login </Link>to view this page.
        </div>

      </>
  )
}

export default AdminHome;