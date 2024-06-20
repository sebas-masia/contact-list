const API_URL = "https://playground.4geeks.com/contact";

export const getAgendas = async () => {
  const response = await fetch(`${API_URL}/agendas`);
  if (!response.ok) {
    throw new Error("Failed to fetch agendas");
  }
  return response.json();
};

export const getAgendasBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/agendas/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch agendas by slug");
  }
  return response.json();
};

export const createAgenda = async (slug) => {
  const response = await fetch(`${API_URL}/agendas/${slug}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to create agenda");
  }
  return response.json();
};

export const deleteAgenda = async (slug) => {
  const response = await fetch(`${API_URL}/agendas/${slug}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete agenda with slug ${slug}`);
  }
  return response.json();
};

export const getAgendaContacts = async (slug) => {
  const response = await fetch(`${API_URL}/agendas/${slug}/contacts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch contacts for agenda with slug ${slug}`);
  }
  return response.json();
};

export const createContact = async (slug, contactData) => {
  const response = await fetch(`${API_URL}/agendas/${slug}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    throw new Error("Failed to create contact");
  }
  return response.json();
};

export const updateContact = async (slug, contactId, contactData) => {
  const response = await fetch(
    `${API_URL}/agendas/${slug}/contacts/${contactId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update contact with id ${contactId}`);
  }
  return response.json();
};

export const deleteContact = async (slug, contactId) => {
  const response = await fetch(
    `${API_URL}/agendas/${slug}/contacts/${contactId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to delete contact with id ${contactId}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
