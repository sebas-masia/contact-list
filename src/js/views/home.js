import React, { useContext, useEffect } from "react";
import { Contact } from "../component/contact";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchAgendaContacts("Sebas");
  }, [store.contacts.length]);

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="text-center">Contacts</h1>
        <div className="d-flex justify-content-end mt-3">
          <Link to="/add">
            <button className="btn btn-success">Add new contact</button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 m-auto">
          {store.contacts.length > 0 ? (
            store.contacts.map((contact) => (
              <Contact key={contact.id} contact={contact} id={contact.id} />
            ))
          ) : (
            <h2 className="text-center">No contacts found</h2>
          )}
        </div>
      </div>
    </div>
  );
};
