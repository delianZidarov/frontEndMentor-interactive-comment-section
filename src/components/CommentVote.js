import "./CommentVote.css";
import { useState } from "react";
function CommentVote({ score, commentDb, getPostAndUpdate, postId }) {
  const [currentScore, setCurrentScore] = useState(score);
  function increaseVoteCount() {
    setCurrentScore(currentScore + 1);
    getPostAndUpdate(commentDb, postId, {
      update: "score",
      value: currentScore + 1,
    });
    localStorage.setItem("commentData", JSON.stringify(commentDb));
  }

  function decreaseVoteCount() {
    setCurrentScore(currentScore - 1);
    getPostAndUpdate(commentDb, postId, {
      update: "score",
      value: currentScore - 1,
    });
    localStorage.setItem("commentData", JSON.stringify(commentDb));
  }

  return (
    <div className="comment-vote-container">
      <button onClick={increaseVoteCount}>
        <img src="./images/icon-plus.svg" alt="+" />
      </button>
      <p>{currentScore}</p>
      <button onClick={decreaseVoteCount}>
        <img src="./images/icon-minus.svg" alt="alt-text" />
      </button>
    </div>
  );
}

export default CommentVote;
