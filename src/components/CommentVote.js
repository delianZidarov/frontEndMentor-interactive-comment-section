import { useEffect, useRef } from "react";
import "./CommentVote.css";
function CommentVote({ score, setVotes }) {
  const renderScore = useRef(score);
  function increaseVoteCount() {
    setVotes(score + 1);
  }

  function decreaseVoteCount() {
    setVotes(score - 1);
  }

  useEffect(() => {
    renderScore.current = score;
  }, [score]);

  return (
    <div className="comment-vote-container">
      <button onClick={increaseVoteCount}>
        <img src="./images/icon-plus.svg" alt="+" />
      </button>
      <p>{renderScore.current}</p>
      <button onClick={decreaseVoteCount}>
        <img src="./images/icon-minus.svg" alt="alt-text" />
      </button>
    </div>
  );
}

export default CommentVote;
