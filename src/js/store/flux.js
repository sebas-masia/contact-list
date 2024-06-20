import {
  getAgendas,
  getAgendasBySlug,
  createAgenda,
  deleteAgenda,
  getAgendaContacts,
  createContact,
  updateContact,
  deleteContact,
} from "./api";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      agendas: [],
      contacts: [],
    },
    actions: {
      fetchAgendas: async () => {
        try {
          const data = await getAgendas();
          setStore({ agendas: data.agendas });
        } catch (error) {
          console.error(error);
        }
      },
      fetchAgendasBySlug: async (slug) => {
        try {
          const data = await getAgendasBySlug(slug);
          setStore({ selectedAgenda: data });
        } catch (error) {
          console.error(error);
        }
      },
      addAgenda: async (slug) => {
        try {
          const newAgenda = await createAgenda(slug);
          const store = getStore();
          setStore({ agendas: [...store.agendas, newAgenda] });
        } catch (error) {
          console.error(error);
        }
      },
      removeAgenda: async (slug) => {
        try {
          await deleteAgenda(slug);
          const store = getStore();
          setStore({
            agendas: store.agendas.filter((agenda) => agenda.slug !== slug),
          });
        } catch (error) {
          console.error("Error deleting agenda:", error);
        }
      },
      fetchAgendaContacts: async (slug) => {
        try {
          const data = await getAgendaContacts(slug);
          setStore({ contacts: data.contacts });
        } catch (error) {
          console.error(`Error fetching contacts for agenda ${slug}:`, error);
        }
      },
      addContact: async (slug, contactData) => {
        try {
          const newContact = await createContact(slug, contactData);
          const store = getStore();
          setStore({ contacts: [...store.contacts, newContact] });
        } catch (error) {
          console.error(`Error adding contact to agenda ${slug}:`, error);
        }
      },
      updateContact: async (slug, contactId, contactData) => {
        try {
          const updatedContact = await updateContact(
            slug,
            contactId,
            contactData
          );
          const store = getStore();
          const updatedContacts = store.contacts.map((contact) =>
            contact.id === contactId ? updatedContact : contact
          );
          setStore({ contacts: updatedContacts });
        } catch (error) {
          console.error(`Error updating contact ${contactId}:`, error);
        }
      },
      removeContact: async (slug, contactId) => {
        try {
          await deleteContact(slug, contactId);
          const store = getStore();
          setStore({
            contacts: store.contacts.filter(
              (contact) => contact.id !== Number(contactId)
            ),
          });
        } catch (error) {
          console.error(`Error deleting contact ${contactId}:`, error);
        }
      },
    },
  };
};

export default getState;
