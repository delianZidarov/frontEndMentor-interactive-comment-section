import React from "react";
import { useState } from "react";
import CommentReact from "./CommentReact.js";
import CommentComment from "./CommentComment.js";
import CommentUser from "./CommentUser.js";
import CommentVote from "./CommentVote.js";
import UserInput from "./UserInput.js";
import "./Comment.css";
function Comment({ commentData, currentUser, commentDb, setCommentData }) {
  const { id, content, createdAt, score, user, replyingTo } = commentData;
  let isCurrentUser = currentUser.username === user.username;
  /*STATES*/
  const [votes, setVotes] = useState(score);
  const [isReplying, setIsReplying] = useState(false);
  console.log("boolean", isCurrentUser);
  console.log("id", id);
  console.log("content", content);
  console.log("createdAt", createdAt);
  console.log("score", score);
  console.log("user", user);
  console.log("replies", replyingTo);

  /*UTILITY FUNCTIONS*/
  function getPostandUpdate(mapObject, postId, query) {
    mapObject.map((post) => {
      if (post.id === postId) {
        post[query.update] = query.value;
        setCommentData(commentDb);
        console.log(commentDb);
      }
      if (post.replies) {
        getPostandUpdate(post.replies, postId, query);
      }
    });
  }
  getPostandUpdate(commentDb, 3, {
    update: "content",
    value: "I'm playing soccer",
  });
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
          <CommentVote score={votes} setVotes={setVotes} />
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
