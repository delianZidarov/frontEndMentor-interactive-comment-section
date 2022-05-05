import "./App.css";
import Comment from "./components/Comment.js";
import data from "./data.json";
import { useEffect, useState } from "react";

function App() {
  const [commentData, setCommentData] = useState(
    JSON.parse(localStorage.getItem("commentData")) || data.comments
  );

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || data.currentUser;

  //trial
  let userComment = commentData[0];

  console.log("in app", commentData);
  function getPostAndUpdate(mapObject, postId, query) {
    mapObject.map((post) => {
      if (post.id === postId) {
        console.log("in post and update before", commentData);
        post[query.update] = query.value;

        setCommentData(commentData);
        console.log("in post and update", commentData);
      }
      if (post.replies) {
        getPostAndUpdate(post.replies, postId, query);
      }
    });
  }
  // let data = [
  //   { name: "bob", message: "hi" },
  //   {
  //     name: "carla",
  //     message: "hello",
  //     replies: [
  //       { name: "bob", message: "hi" },
  //       { name: "mike", message: "hi" },
  //     ],
  //   },
  //   {
  //     name: "maria",
  //     message: "hello",
  //     replies: [
  //       {
  //         name: "jessica",
  //         message: "hi",
  //         replies: [{ name: "chad", message: "hi" }],
  //       },
  //     ],
  //   },
  // ];
  // function makeComment(comment, i) {
  //   return (
  //     <div key={i}>
  //       <h2>{comment.name}</h2>
  //       <p>{comment.message}</p>
  //     </div>
  //   );
  // }
  // function recursiveCreate(comment, i) {
  //   if (comment.replies == null || comment.replies.length === 0) {
  //     return makeComment(comment, i);
  //   }
  //   return (
  //     <>
  //       {makeComment(comment, i)}
  //       <ul>
  //         <li>
  //           {comment.replies.map((comment, i) => recursiveCreate(comment, i))}
  //         </li>
  //       </ul>
  //     </>
  //   );
  // }
  return (
    <main className="App">
      <h1>Interactive comment section</h1>
      {/* {data.map((comment, i) => recursiveCreate(comment, i))} */}
      <Comment
        commentData={userComment}
        currentUser={currentUser}
        commentDb={commentData}
        setCommentData={setCommentData}
        getPostAndUpdate={getPostAndUpdate}
      />
    </main>
  );
}

export default App;
