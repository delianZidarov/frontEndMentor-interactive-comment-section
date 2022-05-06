import React from "react";
import "./CommentComment.css";
function CommentComment({ content, replyingTo }) {
  let isAReply = !(replyingTo == undefined);
  return (
    <p>
      {isAReply && <span className="mention-user">{`@${replyingTo} `}</span>}
      {content}
    </p>
  );
}

export default CommentComment;
