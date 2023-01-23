const contactsDb = require("../models/contacts");
const { HttpError } = require("../routes/helpers/index");

async function getContacts(req, res, next) {
  const contacts = await contactsDb.listContacts();
  if (!contacts) {
    return next(HttpError(404, "No contacts"));
  }
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsDb.getContactById(contactId);
  if (!contact) {
    next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await contactsDb.addContact(name, email, phone);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsDb.getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  await contactsDb.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const body = req.body;
  if (Object.keys(body).length === 0) {
    return next(HttpError(400, "missing fields"));
  }
  const contact = await contactsDb.getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  const updatedContact = await contactsDb.updateContact(contactId, body);
  res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
