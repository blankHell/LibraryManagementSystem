import React from "react";
import Navbar from "./Navbar";
import '../css/admin.css';
import { Link } from "react-router-dom";
import AddRemoveBooks from "./AddRemoveBooks";
import IssueBooks from "./IssueBooks";
import { useState } from "react";
import UserBooks from "./UserBooks";
import RequestBooks from "./RequestBooks";

const User = () => {
  let currentUser;
  const [content, setContent] = useState("");

  if (window.sessionStorage.getItem("userDetails")) {
    currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
  }
  function showContent(contentName) {
    setContent(contentName);
  }
  return (
      <>
        <Navbar />
        <div className="main-div">
          <div className="admin-contents">
            <div className="admin-content-div">
              <div onClick={()=>showContent("UserBooks")}>
                <div className="admin-single-option">Your Books</div>
              </div>
              <div onClick={()=>showContent("RequestBooks")}>
                <div className="admin-single-option">Request Books</div>
              </div>
            </div>
          </div>
          {content === "UserBooks" ? <UserBooks /> : content === "RequestBooks" ? <RequestBooks /> : null}
        </div>
      </>
  )
}

export default User;