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
      setDataInput({ comment: getCurrentPost(commentDb, postId).content });
    }
  }, []);
  function handleInputChange(event) {
    setDataInput({ comment: event.target.value });
  }
  function submitComment(event) {
    event.preventDefault();
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
  function submitEdit(event) {
    event.preventDefault();
    getPostAndUpdate(commentDb, postId, {
      update: "content",
      value: dataInput.comment,
    });
    localStorage.setItem("commentData", JSON.stringify(commentDb));
    openClose();
  }
  function submitReply(event) {
    event.preventDefault();
    /* {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/image-amyrobson.png",
          "webp": "./images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      "replies": []
    }, */
    const post = getCurrentPost(commentDb, postId);
    console.log("current post get", getCurrentPost(commentDb, postId));
    getPostAndUpdate(commentDb, postId, {
      update: "replies",
      value: [
        ...post.replies,
        {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
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
    console.log(dataInput.comment);
    openClose();
  }
  function getCurrentPost(mapObject, postId) {
    let returnPost;
    mapObject.map((post) => {
      if (post.id === postId) {
        returnPost = post;
      } else if (post.replies) {
        getCurrentPost(post.replies, postId);
      }
    });
    return returnPost;
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
