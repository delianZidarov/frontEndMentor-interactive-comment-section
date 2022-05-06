import React from "react";
import { useState } from "react";
import CommentReact from "./CommentReact.js";
import CommentComment from "./CommentComment.js";
import CommentUser from "./CommentUser.js";
import CommentVote from "./CommentVote.js";
import UserInput from "./UserInput.js";
import "./Comment.css";
function Comment({
  commentData,
  currentUser,
  commentDb,
  getPostAndUpdate,
  openCloseDeleteModal,
  wrapperForSetDelete,
}) {
  const { id, content, createdAt, score, user, replyingTo } = commentData;
  const isCurrentUser = currentUser.username === user.username;

  /*STATES*/
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  /*UTILITY FUNCTIONS*/
  function getElapsedTime(date) {
    const potentialDate = new Date(date);
    if (!isNaN(potentialDate)) {
      const timeElapsed = new Date() - potentialDate;
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
  function openCloseEdit() {
    setIsEditing(!isEditing);
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
          {!isEditing && (
            <CommentComment content={content} replyingTo={replyingTo} />
          )}
          {isEditing && (
            <UserInput
              mode="update"
              currentUser={currentUser}
              openClose={openCloseEdit}
              postId={id}
              commentDb={commentDb}
              getPostAndUpdate={getPostAndUpdate}
            />
          )}
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
            openCloseEdit={openCloseEdit}
            openCloseDeleteModal={openCloseDeleteModal}
            wrapperForSetDelete={wrapperForSetDelete}
            postId={id}
          />
        </div>
      </article>
      {isReplying && (
        <UserInput
          mode="reply"
          currentUser={currentUser}
          openClose={openCloseReply}
          postId={id}
          commentDb={commentDb}
          getPostAndUpdate={getPostAndUpdate}
        />
      )}
    </>
  );
}

export default Comment;
