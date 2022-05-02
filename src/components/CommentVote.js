import React, { useInsertionEffect } from "react";
import { useEffect, useRef } from "react";
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
      <button id=" " onClick={increaseVoteCount}>
        <img src="./icon-plus.svg" alt="+" />
      </button>
      <p>{renderScore.current}</p>
      <button onClick={decreaseVoteCount}>
        <img src="./icon-minos.svg" alt="-" />
      </button>
    </div>
  );
}

export default CommentVote;
