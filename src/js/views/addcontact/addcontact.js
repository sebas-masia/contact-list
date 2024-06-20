import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const AddContact = ({ isUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate) {
      const contactToUpdate = store.contacts.find(
        (contact) => contact.id === Number(id)
      );
      if (contactToUpdate) {
        setName(contactToUpdate.name);
        setEmail(contactToUpdate.email);
        setPhone(contactToUpdate.phone);
        setAddress(contactToUpdate.address);
      }
    }
  }, [id, isUpdate]);

  const handleSubmit = (e) => {
    if (!isUpdate) {
      e.preventDefault();
      actions.addContact("Sebas", {
        name: name,
        phone: phone,
        email: email,
        address: address,
      });
      resetForm();
    } else {
      e.preventDefault();
      actions.updateContact("Sebas", Number(id), {
        name: name,
        phone: phone,
        email: email,
        address: address,
      });
      navigate("/");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Add a new contact</h1>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6">
          <form
            className="d-flex flex-column align-items-center border border-1 border-dark p-3"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 w-100">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 w-100">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 w-100">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3 w-100">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <Link to="/">Back to contacts</Link>
        </div>
      </div>
    </div>
  );
};
