const { HttpError } = require("../../routes/helpers/index");
const { Contacts } = require("../../models/contacts");

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  await Contacts.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
}
module.exports = {
  deleteContact,
};
