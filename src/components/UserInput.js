import React from "react";
import { useState, useEffect } from "react";
import "./UserInput.css";
function UserInput({
  mode,
  currentUser,
  openClose,
  postId,
  commentDb,
  getPostAndUpdate,
  addPost,
}) {
  const [dataInput, setDataInput] = useState({ comment: "" });
  useEffect(() => {
    if (mode === "update") {
      let post = getPost(commentDb, postId);
      setDataInput({ comment: post.content });
    }
  }, []);
  function handleInputChange(event) {
    setDataInput({ comment: event.target.value });
  }
  function submitComment() {
    let newPost = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      content: dataInput.comment,
      createdAt: new Date(),
      score: 0,
      user: currentUser,
      replies: [],
    };
    addPost(newPost);
    setDataInput({ comment: "" });
  }
  function submitEdit() {
    getPostAndUpdate(commentDb, postId, {
      update: "content",
      value: dataInput.comment,
    });
    localStorage.setItem("commentData", JSON.stringify(commentDb));
    openClose();
  }
  function submitReply() {
    let post = getPost(commentDb, postId);
    getPostAndUpdate(commentDb, postId, {
      update: "replies",
      value: post.replies
        ? [
            {
              id:
                Date.now().toString(36) + Math.random().toString(36).substr(2),
              content: dataInput.comment,
              createdAt: new Date(),
              user: currentUser,
              score: 0,
              replies: [],
              replyingTo: post.user.username,
            },
            ...post.replies,
          ]
        : [
            {
              id:
                Date.now().toString(36) + Math.random().toString(36).substr(2),
              content: dataInput.comment,
              createdAt: new Date(),
              user: currentUser,
              score: 0,
              replies: [],
              replyingTo: post.user.username,
            },
          ],
    });
    localStorage.setItem("commentData", JSON.stringify(commentDb));
    openClose();
  }
  function getPost(mapO, id) {
    let storage;
    function findPost(mapO, id) {
      if (storage == undefined) {
        mapO.forEach((object) => {
          if (object.id === id) {
            storage = { ...object };
          }
          if (object.replies) {
            findPost(object.replies, id);
          }
        });
      }
    }
    findPost(mapO, id);
    return storage;
  }

  return (
    <form className="user-input-container">
      {mode !== "update" && (
        <div className="user-input-image-container">
          <img src={currentUser.image.webp} alt="profile-picture" />
        </div>
      )}
      <textarea
        name="comment"
        value={dataInput.comment}
        onChange={handleInputChange}
        placeholder="Add a comment..."
      ></textarea>
      <button
        onClick={
          mode === "reply"
            ? submitReply
            : mode === "update"
            ? submitEdit
            : submitComment
        }
      >
        {mode.toUpperCase()}
      </button>
    </form>
  );
}

export default UserInput;
