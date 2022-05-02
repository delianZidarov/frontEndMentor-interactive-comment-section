import React from "react";
import CommentReact from "./CommentReact.js";
import CommentComment from "./CommentComment.js";
import CommentUser from "./CommentUser.js";
import CommentVote from "./CommentVote.js";
function Comment({ commentData, currentUser }) {
  const { id, content, createdAt, score, user, replyingTo } = commentData;
  let isCurrentUser = currentUser.username === user.username;
  console.log("boolean", isCurrentUser);
  console.log("id", id);
  console.log("content", content);
  console.log("createdAt", createdAt);
  console.log("score", score);
  console.log("user", user);
  console.log("replies", replyingTo);
  return (
    <article>
      <CommentUser userData={user} createdAt={createdAt} />
      <CommentComment content={content} replyingTo={replyingTo} />
      <CommentVote score={score} />
      <CommentReact isCurrentUser={isCurrentUser} />
    </article>
  );
}

export default Comment;
