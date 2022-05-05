import React from "react";
import "./CommentReact.css";
function CommentReact({ isCurrentUser, openCloseReply }) {
  return (
    <div className="user-react-container">
      {isCurrentUser && (
        <div>
          <button className="user-react-button">
            <img src="./images/icon-delete.svg" alt="delete-icon" />
            Delete
          </button>
          <button className="user-react-button">
            <img src="./images/icon-edit.svg" alt="edit-icon" />
            Edit
          </button>
        </div>
      )}
      {!isCurrentUser && (
        <button className="user-react-button" onClick={openCloseReply}>
          <img src="./images/icon-reply.svg" alt="reply-icon" />
          Reply
        </button>
      )}
    </div>
  );
}

export default CommentReact;
