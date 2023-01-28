const { HttpError } = require("../../routes/helpers/index");
const { Contacts } = require("../../models/contacts");

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}
module.exports = {
  getContact,
};
