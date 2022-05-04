import React from "react";

function UserInput({ mode, userPicture }) {
  return (
    <form className="user-input-container">
      <div className="user-input-image-container">
        <img src={userPicture} alt="profile-picture" />
      </div>
      <textarea name=""></textarea>
      <button>{mode.toUpperCase()}</button>
    </form>
  );
}

export default UserInput;
