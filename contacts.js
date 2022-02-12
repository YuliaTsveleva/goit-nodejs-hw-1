const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");
// console.log(__dirname);

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = await findIndexOfContactById(contacts, contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  updateContacts(contacts);
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const updateContactById = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const index = await findIndexOfContactById(contacts, id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  updateContacts(contacts);
  return contacts[index];
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const findIndexOfContactById = async (contacts, id) => {
  const indexOfContact = await contacts.findIndex((item) => item.id === id);
  return indexOfContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
