import React from "react";

function ConfirmModal({
  title,
  desc,
  confirmBtn,
  cancelBtn,
  id,
  confirmFunc,
  loading,
}) {
  return (
    <div
      className="modal fade"
      id="confirmModal"
      tabindex="-1"
      aria-labelledby="confirmModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModal">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              id="confirmModalClose"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{desc}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
              style={{ width: 100 }}
            >
              {cancelBtn}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => confirmFunc(id)}
              style={{ width: 100 }}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                confirmBtn
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
