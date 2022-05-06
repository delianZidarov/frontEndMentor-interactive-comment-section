import React from "react";
import "./DeleteModal.css";
function DeleteModal({ openCloseDeleteModal, deleteItem, postId, commentDb }) {
  return (
    <div className="delete-modal">
      <div className="modal-container">
        <div className="modal-contents">
          <h2>Delete comment</h2>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone
          </p>
          <div>
            <button onClick={openCloseDeleteModal}>NO, CANCEL</button>
            <button
              onClick={() => {
                deleteItem(commentDb, postId);
                openCloseDeleteModal();
              }}
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
