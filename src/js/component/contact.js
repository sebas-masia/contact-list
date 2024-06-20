import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contact = ({ contact, id }) => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [contactIdToDelete, setContactIdToDelete] = useState(id);

  const handleDelete = () => {
    actions.removeContact("Sebas", contactIdToDelete);
  };

  return (
    <div className="container mt-3">
      <div className="row col-10 m-auto">
        <div className="card d-flex flex-row align-items-center p-3">
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top img-thumbnail rounded-circle w-auto h-100"
            alt="..."
          />
          <div className="card-body d-flex flex-row mt-1">
            <div className="d-flex flex-column">
              <h5 className="card-title mb-3">{" " + contact.name}</h5>
              <p className="card-text">
                <i className="fa-solid fa-location-dot"></i>
                {" " + contact.address}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-phone"></i>
                {" " + contact.phone}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-envelope"></i>
                {" " + contact.email}
              </p>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <button
              className="btn"
              onClick={() => navigate(`/edit/${contact.id}`)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setContactIdToDelete(id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        key={id}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              If you delete this thing the entire universe will go down!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Oh no!
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
