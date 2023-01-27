const { getContacts } = require("./getAllContacts");
const { getContact } = require("./getContact");
const { createContact } = require("./addContact");
const { deleteContact } = require("./deleteContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
