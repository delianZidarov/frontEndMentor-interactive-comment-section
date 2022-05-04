import React from "react";
import { useState } from "react";
import CommentReact from "./CommentReact.js";
import CommentComment from "./CommentComment.js";
import CommentUser from "./CommentUser.js";
import CommentVote from "./CommentVote.js";
import UserInput from "./UserInput.js";
import "./Comment.css";
function Comment({ commentData, currentUser }) {
  const { id, content, createdAt, score, user, replyingTo } = commentData;
  let isCurrentUser = currentUser.username === user.username;
  /*STATES*/
  const [votes, setVotes] = useState(score);
  const [isReplying, setIsReplying] = useState(true);
  console.log("boolean", isCurrentUser);
  console.log("id", id);
  console.log("content", content);
  console.log("createdAt", createdAt);
  console.log("score", score);
  console.log("user", user);
  console.log("replies", replyingTo);
  return (
    <>
      <article class="comment-container" key={id}>
        <div className="commentUser-component">
          <CommentUser
            userData={user}
            isCurrentUser={isCurrentUser}
            createdAt={createdAt}
          />
        </div>
        <div className="commentComment-component">
          <CommentComment content={content} replyingTo={replyingTo} />
        </div>
        <div className="commentVote-component">
          <CommentVote score={votes} setVotes={setVotes} />
        </div>
        <div className="commentReact-component">
          <CommentReact isCurrentUser={isCurrentUser} />
        </div>
      </article>
      {isReplying && (
        <UserInput mode="reply" userPicture={currentUser.image.webp} />
      )}
    </>
  );
}

export default Comment;
