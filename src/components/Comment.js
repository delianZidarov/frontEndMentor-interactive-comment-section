import React from "react";
import { useState } from "react";
import CommentReact from "./CommentReact.js";
import CommentComment from "./CommentComment.js";
import CommentUser from "./CommentUser.js";
import CommentVote from "./CommentVote.js";
import UserInput from "./UserInput.js";
import "./Comment.css";
function Comment({ commentData, currentUser, commentDb, getPostAndUpdate }) {
  const { id, content, createdAt, score, user, replyingTo } = commentData;
  const isCurrentUser = currentUser.username === user.username;
  /*STATES*/
  const [isReplying, setIsReplying] = useState(false);
  console.log("boolean", isCurrentUser);
  console.log("id", id);
  console.log("content", content);
  console.log("createdAt", createdAt);
  console.log("score", score);
  console.log("user", user);
  console.log("replies", replyingTo);

  /*UTILITY FUNCTIONS*/
  function getElapsedTime(date) {
    const potentialDate = new Date(date);
    if (!isNaN(potentialDate)) {
      const timeElapsed = potentialDate - new Date();
      return elapsedTimeToString(timeElapsed);
    }
    return date;
  }
  function elapsedTimeToString(milli) {
    const seconds = milli / 1000;
    if (seconds < 1) {
      return "1 second ago";
    }
    if (seconds < 60) {
      return `${Math.floor(seconds)} second(s) ago`;
    }
    if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minute(s) ago`;
    }
    if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hour(s) ago`;
    }
    if (seconds < 604800) {
      return `${Math.floor(seconds / 86400)} day(s) ago`;
    }
    if (seconds < 2629743) {
      return `${Math.floor(seconds / 604800)} week(s) ago`;
    }
    if (seconds < 31556926) {
      return `${Math.floor(seconds / 2629743)} months(s) ago`;
    }
    if (seconds > 31556926) {
      return `${Math.floor(seconds / 31556926)} year(s) ago`;
    }
  }
  /*BUTTON FUNCTIONS*/
  function openCloseReply() {
    setIsReplying(!isReplying);
  }
  return (
    <>
      <article className="comment-container" key={id}>
        <div className="commentUser-component">
          <CommentUser
            userData={user}
            isCurrentUser={isCurrentUser}
            createdAt={getElapsedTime(createdAt)}
          />
        </div>
        <div className="commentComment-component">
          <CommentComment content={content} replyingTo={replyingTo} />
        </div>
        <div className="commentVote-component">
          <CommentVote
            score={score}
            commentDb={commentDb}
            getPostAndUpdate={getPostAndUpdate}
            postId={id}
          />
        </div>
        <div className="commentReact-component">
          <CommentReact
            isCurrentUser={isCurrentUser}
            openCloseReply={openCloseReply}
          />
        </div>
      </article>
      {isReplying && (
        <UserInput
          mode="reply"
          currentUser={currentUser}
          openCloseReply={openCloseReply}
          postId={id}
          commentDb={commentDb}
          getPostAndUpdate={getPostAndUpdate}
        />
      )}
    </>
  );
}

export default Comment;
