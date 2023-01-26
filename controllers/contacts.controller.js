// const contactsDb = require("../models/contactsDb");
const { HttpError } = require("../routes/helpers/index");
const { Contacts } = require("../models/contacts");

async function getContacts(req, res, next) {
  const contacts = await Contacts.find({});
  if (!contacts) {
    return next(HttpError(404, "No contacts"));
  }
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await Contacts.create({ name, email, phone });
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  await Contacts.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const body = req.body;
  if (Object.keys(body).length === 0) {
    return next(HttpError(400, "missing fields"));
  }
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const { favorite } = req.body;
  if (!favorite) {
    return next(HttpError(400, "missing field favorite"));
  }
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite: favorite },
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
