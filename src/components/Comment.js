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
            createdAt={createdAt}
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
          userPicture={currentUser.image.webp}
          openCloseReply={openCloseReply}
          userId={id}
        />
      )}
    </>
  );
}

export default Comment;
