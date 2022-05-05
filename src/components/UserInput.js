import React from "react";
import "./UserInput.css";
function UserInput({ mode, userPicture, openCloseReply, userId }) {
  return (
    <form className="user-input-container">
      <div className="user-input-image-container">
        <img src={userPicture} alt="profile-picture" />
      </div>
      <textarea name="" placeholder="Add a comment..."></textarea>
      <button>{mode.toUpperCase()}</button>
    </form>
  );
}

export default UserInput;
