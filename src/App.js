import "./App.css";
import Comment from "./components/Comment.js";
import UserInput from "./components/UserInput.js";
import data from "./data.json";
import { useState } from "react";

function App() {
  const [commentData, setCommentData] = useState(
    JSON.parse(localStorage.getItem("commentData")) || data.comments
  );

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || data.currentUser;

  //trial
  let userComment = commentData[0];
  /*DATA MANIP FUNCTIONS*/
  function addPost(newPost) {
    setCommentData([...commentData, newPost]);
    localStorage.setItem(
      "commentData",
      JSON.stringify([...commentData, newPost])
    );
  }
  function getPostAndUpdate(mapObject, postId, query) {
    mapObject.map((post) => {
      if (post.id === postId) {
        post[query.update] = query.value;
        setCommentData(commentData);
      }
      if (post.replies) {
        getPostAndUpdate(post.replies, postId, query);
      }
    });
  }
  function deleteItem(mapO, postId) {
    let post;
    let stringDb = JSON.stringify(mapO);
    let newDb;
    getPost(mapO, postId);
    try {
      newDb = JSON.parse(stringDb.replace(JSON.stringify(post), ""));
    } catch {
      newDb = JSON.parse(stringDb.replace(JSON.stringify(post) + ",", ""));
    }
    localStorage.setItem("commentData", JSON.stringify(newDb));
    setCommentData(newDb);
    function getPost(mapO, id) {
      if (post == undefined) {
        mapO.forEach((object) => {
          if (object.id === id) {
            post = object;
          }
          if (object.replies) {
            getPost(object.replies, id);
          }
        });
      }
    }
  }

  return (
    <main className="App">
      <h1>Interactive comment section</h1>

      <Comment
        commentData={userComment}
        currentUser={currentUser}
        commentDb={commentData}
        setCommentData={setCommentData}
        getPostAndUpdate={getPostAndUpdate}
        deleteItem={deleteItem}
      />

      <UserInput mode="send" currentUser={currentUser} addPost={addPost} />
    </main>
  );
}

export default App;
