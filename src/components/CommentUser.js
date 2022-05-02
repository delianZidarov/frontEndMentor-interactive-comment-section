import React from "react";
import "./CommentUser.css";
function CommentUser({ userData, createdAt }) {
  return (
    <div className="user-data-container">
      <div className="user-image-container">
        <img src={userData.image.webp} alt={userData.username} />
      </div>
      <h2>{userData.username}</h2>
      <p>{createdAt}</p>
    </div>
  );
}

export default CommentUser;
