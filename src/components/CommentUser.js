import React from "react";
import "./CommentUser.css";
function CommentUser({ userData, createdAt, isCurrentUser }) {
  // isCurrentUser = true;
  return (
    <div className="user-data-container">
      <div className="user-image-container">
        <img src={userData.image.webp} alt={userData.username} />
      </div>
      <h2>{userData.username}</h2>
      {isCurrentUser && <span className="current-user-span">you</span>}
      <p>{createdAt}</p>
    </div>
  );
}

export default CommentUser;
