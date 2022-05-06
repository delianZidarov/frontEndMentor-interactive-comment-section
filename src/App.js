import "./App.css";
import Comment from "./components/Comment.js";
import UserInput from "./components/UserInput.js";
import data from "./data.json";
import React from "react";
import { useState, useEffect } from "react";

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
        setCommentData([...commentData]);
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
    // try {
    //   console.log(
    //     "IN TRY",
    //     JSON.parse(stringDb.replace(JSON.stringify(post), ""))
    //   );
    //   newDb = JSON.parse(stringDb.replace(JSON.stringify(post), ""));
    // } catch {
    //   newDb = JSON.parse(stringDb.replace(JSON.stringify(post) + ",", ""));
    //   console.log("IN CATCH", newDb);
    // }
    console.log("hi");
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
  useEffect(() => {
    console.log("hi");
  }, [commentData]);
  function renderPostTree(allPostData) {
    let posts = allPostData.map((post) => {
      if (post.replies && post.replies.length > 0) {
        return (
          <React.Fragment key={`${post.id}-fragment-replies`}>
            <Comment
              commentData={post}
              currentUser={currentUser}
              commentDb={commentData}
              setCommentData={setCommentData}
              getPostAndUpdate={getPostAndUpdate}
              deleteItem={deleteItem}
              key={post.id}
            />
            <div className="replies" key={`${post.id}-replies`}>
              {renderPostTree(post.replies)}{" "}
            </div>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={`${post.id}-fragment`}>
          <Comment
            commentData={post}
            currentUser={currentUser}
            commentDb={commentData}
            setCommentData={setCommentData}
            getPostAndUpdate={getPostAndUpdate}
            deleteItem={deleteItem}
            key={post.id}
          />
        </React.Fragment>
      );
    });
    return posts;
  }

  return (
    <main className="App">
      {/*    <h1>Interactive comment section</h1>

       <Comment
         commentData={userComment}
         currentUser={currentUser}
         commentDb={commentData}
         setCommentData={setCommentData}
         getPostAndUpdate={getPostAndUpdate}
         deleteItem={deleteItem}
       /> */}
      <div>{renderPostTree(commentData)}</div>
      <div className="make-comment-container">
        <UserInput mode="send" currentUser={currentUser} addPost={addPost} />
      </div>
    </main>
  );
}

export default App;
