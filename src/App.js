import "./App.css";
import Comment from "./components/Comment.js";
import UserInput from "./components/UserInput.js";
import DeleteModal from "./components/DeleteModal.js";
import data from "./data.json";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [commentData, setCommentData] = useState(
    JSON.parse(localStorage.getItem("commentData")) || data.comments
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
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
    console.log("POST ID IN DELETEITEM", postId);
    let post = getPost(mapO, postId);
    let stringDb = JSON.stringify(mapO);
    let stringPost = JSON.stringify(post);
    let postLength = stringPost.length;
    let position = { layer: 0, index: 0, length: 0 };
    let newDb;
    getPostPath(mapO, postId);
    console.log("POSITION", position);
    function getPostPath(mapO, id) {
      if (post == undefined) {
        mapO.forEach((object) => {
          if (object.id === id) {
            post = object;
          }
          if (object.replies) {
            console.log("IF IN POSITION", position.layer + 1);
            position.layer = position.layer + 1;
            position.length = object.replies.length;
            getPostPath(object.replies, id);
          }
        });
      }
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
  }
  // Button FUNCTIONS
  function openCloseDeleteModal() {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }
  function wrapperForSetDelete(id) {
    setDeletePostId(id);
  }

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
              openCloseDeleteModal={openCloseDeleteModal}
              key={post.id}
              wrapperForSetDelete={wrapperForSetDelete}
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
            openCloseDeleteModal={openCloseDeleteModal}
            key={post.id}
            wrapperForSetDelete={wrapperForSetDelete}
          />
        </React.Fragment>
      );
    });
    return posts;
  }

  return (
    <main className="App">
      <div>{renderPostTree(commentData)}</div>
      <div className="make-comment-container">
        <UserInput mode="send" currentUser={currentUser} addPost={addPost} />
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          deleteItem={deleteItem}
          openCloseDeleteModal={openCloseDeleteModal}
          postId={deletePostId}
          commentDb={commentData}
        />
      )}
    </main>
  );
}

export default App;
